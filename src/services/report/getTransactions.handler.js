import db from '@src/db/models';
import { dayjs } from '@src/libs/dayjs';
import { BaseHandler } from '@src/libs/logicBase';
import { COINS, TRANSACTION_PURPOSE, COINS_FILTER } from "@src/utils/constants/public.constants";
import { from } from 'form-data';


export class GetTransactions extends BaseHandler {
  async run(args) {
    const {
      pageNo = 1,
      limit = 10,
      startDate = dayjs().startOf('week').format(),
      endDate = dayjs().add(1, 'day').endOf('day').format(),
      currencyCode,
      purpose,
      email,
      userId,
    } = this.args;

    const offset = (pageNo - 1) * limit;

    // Dynamic WHERE Clause
    const whereClauses = [];
    if (userId) whereClauses.push('t.user_id = :userId');
    if (email) whereClauses.push('u.email ILIKE CONCAT(\'%\', :email, \'%\')');
    if (currencyCode) {
      if (currencyCode === COINS_FILTER.GOLD_COIN) {
        whereClauses.push("tl.currency_code = 'GC'");
      } else if (currencyCode === COINS_FILTER.SWEEP_COIN) {
        whereClauses.push("tl.currency_code IN ('PSC', 'RSC', 'BSC')");
      }
    }

    if (purpose) whereClauses.push('t.purpose = :purpose');
    if (startDate && endDate) {
      whereClauses.push('t.created_at BETWEEN :startDate AND :endDate');
    } else if (startDate) {
      whereClauses.push('t.created_at >= :startDate');
    } else if (endDate) {
      whereClauses.push('t.created_at <= :endDate');
    }

    const whereCondition = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const query = `
      WITH FilteredTransactions AS (
      SELECT
          t.transaction_id,
          t.user_id,
          u.email,
          u.username,
          t.purpose,
          t.created_at,
          SUM(CASE WHEN tl.currency_code = 'GC' THEN tl.amount ELSE 0 END) AS gcCoin,
          SUM(CASE WHEN tl.currency_code IN ('RSC', 'BSC', 'PSC') THEN tl.amount ELSE 0 END) AS scCoins,
          SUM(CASE WHEN tl.currency_code IN ('RSC', 'BSC', 'PSC') THEN tl.amount ELSE 0 END) AS amount
      FROM
          transactions t
      LEFT JOIN
          transaction_ledgers tl
          ON tl.transaction_id = t.transaction_id AND tl.transaction_type = 'banking'
      LEFT JOIN
          users u
          ON u.user_id = t.user_id
      ${whereCondition}
      GROUP BY
          t.transaction_id, u.email, u.username
      ),
      PaginatedTransactions AS (
          SELECT *
          FROM FilteredTransactions
          ORDER BY created_at DESC
          LIMIT :limit OFFSET :offset
      )
      SELECT
          (SELECT COUNT(*) FROM FilteredTransactions) AS total_count,
          json_agg(PaginatedTransactions) AS rows
      FROM PaginatedTransactions;`;

    const results = await db.sequelize.query(query, {
      replacements: {
        userId,
        email,
        currencyCode,
        purpose,
        startDate,
        endDate,
        limit,
        offset,
      },
      type: db.sequelize.QueryTypes.SELECT,
    });

    return {
      data: results?.[0]?.rows,
      totalCount: results?.[0]?.total_count,
      pageNo,
      limit,
      message: 'Transactions fetched successfully.',
    };
  }
}