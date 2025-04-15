import db from '@src/db/models';
import { BaseHandler } from '@src/libs/logicBase';

export class GetTopTenHandler extends BaseHandler {
  get constraints() {
    return getTopPlayerSchema;
  }

  async run() {
    let { orderBy = 'total_sc_wagered',
      orderDirection = 'DESC',
      userId,
      search,
      page = 1,
      pageSize = 10
    } = this.args;

    // Query to get the total count of records
    const countQuery = `SELECT COUNT(*) as total FROM user_stats`;
    const countResult = await db.sequelize.query(countQuery, {
      type: db.sequelize.QueryTypes.SELECT,
    });
    const totalRecords = countResult[0].total;

    // Calculate total pages
    const totalPages = Math.ceil(totalRecords / pageSize);

    // Validate page number
    if (page > totalPages) {
      page = totalPages > 0 ? totalPages : 1; // Ensure page is within range
    }

    // // Default query to select from the materialized view (user_stats)
    // let query = `SELECT * FROM user_stats`;
    let whereClause=''
    if (userId) whereClause += ` WHERE us.user_id = ${userId}`
    if (search) whereClause += ` WHERE us.user_name ILIKE CONCAT('%', '${search}', '%')`
    // // Apply dynamic sorting
    // query += ` ORDER BY ${orderBy} ${orderDirection}`;

    // // Apply pagination (LIMIT and OFFSET)
    // query += ` LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`;

    let query = `
    SELECT 
      us.user_id,
      us.user_name,
      us.bet_count,
      us.win_count,
      us.total_sc_wagered,
      us.total_sc_won,
      us.total_sc_purchased,
      us.total_sc_redeemed,
      us.total_sc_bonus,
      us.total_gc_bonus,
      COALESCE(SUM(CASE WHEN w.currency_code = 'GC' THEN w.balance ELSE 0 END), 0) AS GC_balance,
      COALESCE(SUM(CASE WHEN w.currency_code IN ('PSC', 'BSC', 'RSC') THEN w.balance ELSE 0 END), 0) AS SC_balance
    FROM 
      user_stats us
    LEFT JOIN 
      wallets w ON us.user_id = w.user_id  -- Fetch all wallets for each user
    ${whereClause}
    GROUP BY 
      us.user_id, us.user_name, us.bet_count, us.win_count, 
      us.total_sc_wagered, us.total_sc_won, 
      us.total_sc_purchased, us.total_sc_redeemed,us.total_sc_bonus,us.total_gc_bonus
    ORDER BY ${orderBy} ${orderDirection}
    LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}
  `;
  

    // Execute the query and fetch the data
    const data = await db.sequelize.query(query, {
      type: db.sequelize.QueryTypes.SELECT
    });

    // Return data with pagination details
    return { data, page, totalPages }
  }
}
