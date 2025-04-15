import db from '@src/db/models';
import { dayjs } from '@src/libs/dayjs';
import { BaseHandler } from '@src/libs/logicBase';

export class GetCasinoTransactions extends BaseHandler {
  async run(args) {
    const {
      pageNo = 1,
      limit = 10,
      startDate = dayjs().startOf('week').format(),
      endDate = dayjs().add(1, 'day').endOf('day').format(),
      currencyCode,
      gameName,
      purpose,
      email,
      userId,
    } = this.args;

    const offset = this.calculateOffset(pageNo, limit);
    const whereCondition = this.buildWhereCondition({
      userId,
      email,
      currencyCode,
      purpose,
      startDate,
      gameName,
      endDate,
    });

    const query = this.constructQuery(whereCondition);

    const results = await this.executeQuery(query, {
      userId,
      email,
      currencyCode,
      purpose,
      startDate,
      endDate,
      gameName,
      limit,
      offset,
    });

    return this.formatResponse(results, pageNo, limit);
  }

  calculateOffset(pageNo, limit) {
    return (pageNo - 1) * limit;
  }

  buildWhereCondition({ userId, email, currencyCode, gameName, purpose, startDate, endDate }) {
    const clauses = [];

    if (userId) clauses.push('ct.user_id = :userId');
    if (email) clauses.push("u.email ILIKE CONCAT('%', :email, '%')");
    if (gameName) clauses.push("cg.name ILIKE CONCAT('%', :gameName, '%')");
    if (currencyCode) clauses.push('tl.currency_code = :currencyCode');
    if (purpose) clauses.push('ct.action_type = :purpose');

    if (startDate && endDate) {
      clauses.push('ct.created_at BETWEEN :startDate AND :endDate');
    } else if (startDate) {
      clauses.push('ct.created_at >= :startDate');
    } else if (endDate) {
      clauses.push('ct.created_at <= :endDate');
    }

    return clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  }

  constructQuery(whereCondition) {
    return `
      WITH FilteredCasinoTransactions AS (
        SELECT
          ct.id AS casino_transaction_id,
          ct.casino_game_id,
          ct.user_id,
          u.email,
          cg.name AS casino_game_name,
          u.username,
          ct.action_type,
          ct.created_at,
          SUM(CASE WHEN tl.currency_code = 'GC' THEN tl.amount ELSE 0 END) AS gcCoin,
          SUM(CASE WHEN tl.currency_code IN ('RSC', 'BSC', 'PSC') THEN tl.amount ELSE 0 END) AS scCoins
        FROM
          casino_transactions ct
        LEFT JOIN
          transaction_ledgers tl ON tl.transaction_id = ct.id AND tl.transaction_type = 'casino'
        LEFT JOIN
          casino_games cg ON cg.id = ct.casino_game_id
        LEFT JOIN
          users u ON u.user_id = ct.user_id
        ${whereCondition}
        GROUP BY
          ct.id, u.email, u.username, cg.name
      ),
      PaginatedCasinoTransactions AS (
        SELECT *
        FROM FilteredCasinoTransactions
        ORDER BY created_at DESC
        LIMIT :limit OFFSET :offset
      )
      SELECT
        (SELECT COUNT(*) FROM FilteredCasinoTransactions) AS total_count,
        json_agg(PaginatedCasinoTransactions) AS rows
      FROM PaginatedCasinoTransactions;
    `;
  }

  async executeQuery(query, replacements) {
    return await db.sequelize.query(query, {
      replacements,
      type: db.sequelize.QueryTypes.SELECT,
    });
  }

  formatResponse(results, pageNo, limit) {
    return {
      data: results?.[0]?.rows || [],
      totalCount: results?.[0]?.total_count || 0,
      pageNo,
      limit,
      message: 'Transactions fetched successfully.',
    };
  }
}
