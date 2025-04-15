import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { filterByDateCreatedAt } from '@src/utils/common'
import { SUCCESS_MSG } from '@src/utils/success'
import sequelize from 'sequelize'

const schema = {
  type: 'object',
  properties: {
    startDate: { type: ['string', 'null'] },
    endDate: { type: ['string', 'null'] },
    currency: { type: ['string', 'null'] }
  }
}



export class GetUserReport extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { startDate, endDate, currency } = this.args

    let query = {}

    if (startDate || endDate) query = filterByDateCreatedAt(query, startDate, endDate, 'CasinoTransaction')
    if (currency) query = { ...query, currencyCode: currency }

    const playerTransactionReport = await db.CasinoTransaction.findAll({
      where: query,
      attributes: [
        [sequelize.literal('SUM(CASE WHEN action_type = \'bet\' THEN amount ELSE 0 END)'), 'betAmount'],
        [sequelize.literal('SUM(CASE WHEN action_type = \'win\' THEN amount ELSE 0 END)'), 'winAmount']
      ],
      include: [
        {
          model: db.User,
          required: true,
          attributes: ['userId', 'username']
        }
      ],
      group: ['User.user_id'],
      raw: true
    })

    query = {}
    if (startDate || endDate) query = filterByDateCreatedAt(query, startDate, endDate, 'TransactionBanking')

    // const bonusReport = await db.TransactionBanking.findAll({
    //   where: query,
    //   attributes: [
    //     'targetId',
    //     [sequelize.literal(`SUM(CASE WHEN transaction_type = 'commision' OR transaction_type = 'bonusReferral' OR transaction_type = 'bonus' THEN amount ELSE 0 END)`), 'bonusAmount']
    //   ],
    //   group: ['targetId'],
    //   raw: true
    // })

    return {
      // bonusReport ,
      playerTransactionReport,
      message: SUCCESS_MSG.GET_SUCCESS
    }
  }
}
