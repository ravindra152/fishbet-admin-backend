import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { pageValidation } from '@src/utils/common'
import { SUCCESS_MSG } from '@src/utils/success'

const schema = {
  type: 'object',
  properties: {
    limit: { type: 'string' },
    pageNo: { type: 'string' }
  }
}



export class GetAggregatorsHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run() {
    const { limit, pageNo } = this.args
    let aggregators

    if (pageNo && limit) {
      const { page, size } = pageValidation(pageNo, limit)
      aggregators = await db.CasinoAggregator.findAndCountAll({
        order: [['id', 'ASC']],
        limit: size,
        offset: ((page - 1) * size)
      })
    } else {
      aggregators = await db.CasinoAggregator.findAndCountAll({
        order: [['id', 'ASC']],
        attributes: ['id', 'name', 'isActive']
      })
    }
    console.log(aggregators, '============================================')
    if (!aggregators) throw new AppError(Errors.AGGREGATOR_NOT_FOUND)

    return { aggregators, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
