import db from '@src/db/models'
import { serverDayjs } from '@src/libs/dayjs'
import { BaseHandler } from '@src/libs/logicBase'
import { client } from '@src/libs/redis'

export class GetApplicationStatsHandler extends BaseHandler {
  async run() {
    let { startDate, endDate } = this.args || {}

    // if (!startDate || !endDate || serverDayjs(endDate).diff(serverDayjs(startDate), 'days') < 10) {
    if (!startDate || !endDate) {
      startDate = serverDayjs().subtract(10, 'days').startOf('day').toISOString()
      endDate = serverDayjs().endOf('day').toISOString()
    } else {
      startDate = serverDayjs(startDate).startOf('day').toISOString()
      endDate = serverDayjs(endDate).endOf('day').toISOString()
    }
    const dateCondition = `AND t.created_at BETWEEN '${startDate}' AND '${endDate}'`
    const redisKeyPattern = '*:ACCESS_TOKEN'

    const [
      totalPlayersCount,
      activePlayerKeys,
      totalCasinoGamesCount,
      totalGGR,
      GGRTrend,
      depositTrendsData,
      depositCounts,
      newRegistrationsCount,
      depositAndWithdraw,
      getDateWiseGGR
    ] = await Promise.all([
      db.User.count(),
      client.keys(redisKeyPattern),
      db.CasinoGame.count(),
      this.getTotalGGR(),
      this.getGGRTrend(startDate, endDate),
      this.getDepositTrends(startDate, endDate),
      this.getDepositCounts(startDate, endDate),
      this.getNewRegistrations(startDate, endDate),
      this.getDepositAndWithdraw(dateCondition),
      this.getDateWiseGGR(startDate, endDate),

    ]);

    const depositUsersCount = depositCounts[0]?.deposit_user_count || 0;
    const depositConversionRate = totalPlayersCount > 0 ? ((depositUsersCount / totalPlayersCount) * 100).toFixed(2) : 0;
    return {
      totalPlayers: totalPlayersCount,
      activePlayers: activePlayerKeys.length || 0,
      coins: depositAndWithdraw?.[0],
      totalCasinoGames: totalCasinoGamesCount,
      totalBetAmount: totalGGR[0]?.total_bet_sc || 0,
      totalWinAmount: totalGGR[0]?.total_win_sc || 0,
      dateWiseBetAmount: getDateWiseGGR[0]?.total_bet_sc || 0,
      dateWiseWinAmount: getDateWiseGGR[0]?.total_win_sc || 0,
      GGRTrend,
      depositConversionRate,
      depositTrends: depositTrendsData,
      newRegistrations: newRegistrationsCount[0]?.new_users || 0
    };
  }

  async getTotalGGR() {
    return db.sequelize.query(
      `SELECT 
        SUM(CASE WHEN tl.currency_code != 'GC' AND tl.direction = 'Debit' THEN tl.amount ELSE 0 END) AS total_bet_sc,
        SUM(CASE WHEN tl.currency_code != 'GC' AND tl.direction = 'Credit' THEN tl.amount ELSE 0 END) AS total_win_sc
      FROM transaction_ledgers tl
      WHERE tl.transaction_type = 'casino';`,
      { type: db.Sequelize.QueryTypes.SELECT }
    );
  }
  async getDateWiseGGR(startDate, endDate) {
    return db.sequelize.query(
      `SELECT 
        SUM(CASE WHEN tl.currency_code != 'GC' AND tl.direction = 'Debit' THEN tl.amount ELSE 0 END) AS total_bet_sc,
        SUM(CASE WHEN tl.currency_code != 'GC' AND tl.direction = 'Credit' THEN tl.amount ELSE 0 END) AS total_win_sc
      FROM transaction_ledgers tl
      WHERE tl.transaction_type = 'casino'
        AND tl.created_at BETWEEN '${startDate}' AND '${endDate}';`,
      { type: db.Sequelize.QueryTypes.SELECT }
    );
  }


  async getGGRTrend(startDate, endDate) {
    return db.sequelize.query(
      `SELECT 
        DATE(tl.created_at) AS date,
        SUM(CASE WHEN tl.currency_code != 'GC' AND tl.direction = 'Debit' THEN tl.amount ELSE 0 END) AS total_bet_sc,
        SUM(CASE WHEN tl.currency_code != 'GC' AND tl.direction = 'Credit' THEN tl.amount ELSE 0 END) AS total_win_sc
      FROM transaction_ledgers tl
      WHERE tl.transaction_type = 'casino' AND tl.created_at BETWEEN '${startDate}' AND '${endDate}'
      GROUP BY DATE(tl.created_at) ORDER BY date DESC;`,
      { type: db.Sequelize.QueryTypes.SELECT }
    );
  }

  async getDepositTrends(startDate, endDate) {
    return db.sequelize.query(
      `SELECT 
        DATE(tl.created_at) AS transaction_date,
        SUM(CASE WHEN tl.currency_code != 'GC' AND bt.purpose = 'purchase' THEN tl.amount ELSE 0 END) AS total_sc_rewarded,
        SUM(CASE WHEN tl.currency_code = 'GC' AND bt.purpose = 'purchase' THEN tl.amount ELSE 0 END) AS total_gc_purchased,
        SUM(CASE WHEN tl.currency_code != 'GC' AND bt.purpose = 'redeem' THEN tl.amount ELSE 0 END) AS total_sc_redeemed
      FROM transaction_ledgers tl
      JOIN transactions bt ON bt.transaction_id = tl.transaction_id
      WHERE tl.transaction_type = 'banking' AND bt.created_at BETWEEN '${startDate}' AND '${endDate}'
      GROUP BY DATE(tl.created_at)
      ORDER BY transaction_date ASC;`,
      { type: db.Sequelize.QueryTypes.SELECT }
    );
  }

  async getDepositCounts(startDate, endDate) {
    return db.sequelize.query(
      `SELECT COUNT(DISTINCT user_id) AS deposit_user_count 
      FROM transactions 
      WHERE purpose = 'purchase' 
        AND created_at BETWEEN :startDate AND :endDate;`,
      { replacements: { startDate, endDate }, type: db.Sequelize.QueryTypes.SELECT }
    );
  }

  async getNewRegistrations(startDate, endDate) {
    return db.sequelize.query(
      `SELECT COUNT(*) AS new_users 
      FROM users 
      WHERE created_at BETWEEN :startDate AND :endDate;`,
      { replacements: { startDate, endDate }, type: db.Sequelize.QueryTypes.SELECT }
    );
  }

  // async getDepositAndWithdraw(dateCondition) {
  //   return db.sequelize.query(
  //     `SELECT 
  //       SUM(CASE WHEN t.purpose = 'purchase' THEN tl.amount ELSE 0 END) AS total_sc_purchased,
  //       SUM(CASE WHEN t.purpose = 'redeem' THEN tl.amount ELSE 0 END) AS total_sc_redeemed
  //     FROM transaction_ledgers tl
  //     JOIN transactions t ON t.transaction_id = tl.transaction_id
  //     WHERE tl.transaction_type = 'banking' ${dateCondition}`,
  //     { type: db.Sequelize.QueryTypes.SELECT }
  //   );
  // }

  async getDepositAndWithdraw(dateCondition) {
    return db.sequelize.query(
      `
    SELECT 
            SUM(CASE WHEN t.purpose = 'purchase' AND t.status = 'successful' AND tl.transaction_type = 'banking' AND tl.currency_code = 'PSC' AND  tl.currency_code != 'GC' THEN tl.amount ELSE 0 END) AS total_sc_purchased,
            SUM(CASE WHEN t.purpose = 'redeem' AND t.status = 'successful' AND tl.transaction_type = 'banking' AND tl.currency_code = 'RSC' AND tl.currency_code != 'GC' THEN tl.amount ELSE 0 END) AS total_sc_redeemed
          FROM transaction_ledgers tl
          JOIN transactions t ON t.transaction_id = tl.transaction_id
      WHERE tl.transaction_type = 'banking' ${dateCondition}`,
      { type: db.Sequelize.QueryTypes.SELECT }
    );
  }


}
