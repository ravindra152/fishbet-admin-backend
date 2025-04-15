'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the materialized view
    await queryInterface.sequelize.query(`
      CREATE MATERIALIZED VIEW user_stats AS
WITH 
  wagered_and_wins AS (
    SELECT 
      ct.user_id,
      u.username, 
      COUNT(CASE WHEN tl.direction = 'Debit' THEN 1 END) AS bet_count,
      COUNT(CASE WHEN tl.direction = 'Credit' THEN 1 END) AS win_count,
      SUM(CASE WHEN tl.currency_code != 'GC' AND tl.direction = 'Debit' THEN tl.amount ELSE 0 END) AS total_sc_wagered,
      SUM(CASE WHEN tl.currency_code != 'GC' AND tl.direction = 'Credit' THEN tl.amount ELSE 0 END) AS total_sc_won
    FROM 
      transaction_ledgers tl
    JOIN 
      casino_transactions ct ON tl.transaction_id = ct.id -- Join to get the user_id from casino_transactions
    JOIN 
      users u on ct.user_id = u.user_id 
    WHERE 
      tl.transaction_type = 'casino'
    GROUP BY 
      ct.user_id, u.username
  ),
  purchases_and_redeems AS (
    SELECT 
      bt.user_id,
      u.username,
      SUM(CASE WHEN tl.currency_code != 'GC' AND bt.purpose = 'purchase' THEN tl.amount ELSE 0 END) AS total_sc_purchased,
      SUM(CASE WHEN tl.currency_code != 'GC' AND bt.purpose = 'redeem' THEN tl.amount ELSE 0 END) AS total_sc_redeemed,
      SUM(CASE 
        WHEN tl.currency_code != 'GC' 
             AND bt.purpose IN ('bonus_cash', 'bonus_deposit', 'bonus_referral', 
                                'bonus_to_cash', 'bonus_forfeit', 'bonus_win', 
                                'bonus_drop', 'postal_code') 
        THEN tl.amount 
        ELSE 0 
    END) AS total_sc_bonus,
    SUM(CASE 
        WHEN tl.currency_code = 'GC' 
             AND bt.purpose IN ('bonus_cash', 'bonus_deposit', 'bonus_referral', 
                                'bonus_to_cash', 'bonus_forfeit', 'bonus_win', 
                                'bonus_drop', 'postal_code') 
        THEN tl.amount 
        ELSE 0 
    END) AS total_gc_bonus
    FROM 
      transaction_ledgers tl
    JOIN 
      transactions bt ON bt.transaction_id = tl.transaction_id
    JOIN 
      users u on bt.user_id = u.user_id 
    WHERE 
      tl.transaction_type = 'banking'
    GROUP BY 
      bt.user_id, u.username
  )
SELECT 
  COALESCE(wagered_and_wins.user_id, purchases_and_redeems.user_id) AS user_id,
  COALESCE(wagered_and_wins.username, purchases_and_redeems.username) AS user_name,
  COALESCE(wagered_and_wins.bet_count, 0) AS bet_count,
  COALESCE(wagered_and_wins.win_count, 0) AS win_count,
  COALESCE(wagered_and_wins.total_sc_wagered, 0) AS total_sc_wagered,
  COALESCE(wagered_and_wins.total_sc_won, 0) AS total_sc_won,
  COALESCE(purchases_and_redeems.total_sc_purchased, 0) AS total_sc_purchased,
  COALESCE(purchases_and_redeems.total_sc_redeemed, 0) AS total_sc_redeemed,
  COALESCE(purchases_and_redeems.total_sc_bonus, 0) AS total_sc_bonus,
  COALESCE(purchases_and_redeems.total_gc_bonus, 0) AS total_gc_bonus
FROM 
  wagered_and_wins
FULL OUTER JOIN 
  purchases_and_redeems 
ON 
  wagered_and_wins.user_id = purchases_and_redeems.user_id ;
    `);

  },

  async down(queryInterface, Sequelize) {
    // Drop the materialized view
    await queryInterface.sequelize.query(`DROP MATERIALIZED VIEW IF EXISTS user_stats;`);
  },
};
