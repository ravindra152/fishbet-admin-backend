import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { dateOptionsFilter } from '@src/utils/common'

export class GetGameReportHandler extends BaseHandler {
  get constraints() {
    return schema
  }

  async run() {
    const { startDate, endDate, dateOptions, tab, search, page = 1, pageSize = 10,  orderBy, orderDirection = 'ASC' } = this.args

    const offset = (page - 1) * pageSize

    let whereClause = `tl.transaction_type = 'casino'`
    const replacements = {}

    // Add search functionality for game name
    if (search) {
      whereClause += ` AND cg.name ILIKE :search`
      replacements.search = `%${search}%`
    }

    let selectClause, groupByClause, orderClause

    if (tab === 'provider') {
      selectClause = `
        cp.unique_id AS provider_id,
        cp.name AS provider_name
      `
      groupByClause = `cp.unique_id, cp.name`
      orderClause = orderBy || 'provider_name'
    } else {
      selectClause = `
        ct.casino_game_id AS game_id,
        cg.name AS game_name
      `
      groupByClause = `ct.casino_game_id, cg.name`  // Fixed: Ensure proper grouping
      orderClause = orderBy || 'game_name'

    }

    // Add date filtering
    if(dateOptions){
      const { fromDate, toDate}=dateOptionsFilter(dateOptions)
      whereClause += ` AND tl.created_at BETWEEN :startDate AND :endDate`
      replacements.startDate = fromDate
      replacements.endDate = toDate
    }
    else if (startDate && endDate) {
      whereClause += ` AND tl.created_at BETWEEN :startDate AND :endDate`
      replacements.startDate = startDate
      replacements.endDate = endDate
    }

    // Query for total count of rows
    const countQuery = `
      SELECT 
        COUNT(DISTINCT ct.casino_game_id) AS total
      FROM 
        transaction_ledgers tl
      JOIN 
        casino_transactions ct ON tl.transaction_id = ct.id
      JOIN 
        casino_games cg ON ct.casino_game_id = cg.id
      WHERE 
        ${whereClause}
    `
    const totalCountResult = await db.sequelize.query(countQuery, {
      type: db.Sequelize.QueryTypes.SELECT,
      replacements
    })

    const totalCount = totalCountResult[0]?.total || 0
    const totalPages = Math.ceil(totalCount / pageSize)

    // Fetch the game report
    const gameReportQuery = `
      SELECT 
        ${selectClause},
        SUM(CASE 
            WHEN tl.currency_code = 'GC' AND tl.direction = 'Debit' THEN tl.amount 
            ELSE 0 
        END) AS gc_wagered,
        SUM(CASE 
            WHEN tl.currency_code != 'GC' AND tl.direction = 'Debit' THEN tl.amount 
            ELSE 0 
        END) AS sc_wagered,
        SUM(CASE 
            WHEN tl.currency_code != 'GC' AND tl.direction = 'Credit' THEN tl.amount 
            ELSE 0 
        END) AS sc_won,
        SUM(CASE 
            WHEN tl.currency_code = 'GC' AND tl.direction = 'Credit' THEN tl.amount 
            ELSE 0 
        END) AS gc_won
      FROM 
        transaction_ledgers tl
      JOIN 
        casino_transactions ct ON tl.transaction_id = ct.id
      JOIN 
        casino_games cg ON ct.casino_game_id = cg.id
      JOIN
        casino_providers cp ON cp.id=cg.casino_provider_id
      WHERE 
        ${whereClause}
      GROUP BY 
        ${groupByClause}
      ORDER BY 
        ${orderClause} ${orderDirection} 
      LIMIT 
        :pageSize
      OFFSET 
        :offset
    `

    const gameReport = await db.sequelize.query(gameReportQuery, {
      type: db.Sequelize.QueryTypes.SELECT,
      replacements: { ...replacements, pageSize, offset }
    })

    return { gameReport, totalPages, page }
  }
}
