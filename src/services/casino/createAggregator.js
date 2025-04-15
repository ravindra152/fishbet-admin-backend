import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'
import { getOne, createNewEntity } from '@src/services/helper/crud'

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    isActive: { type: 'boolean' }
  },
  required: ['name']
}



export class CreateAggregatorHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { name, isActive } = this.args
    const transaction = this.context.sequelizeTransaction

    const checkAggregatorExists = await getOne({ model: db.CasinoAggregator, data: { name }, attributes: ['gameAggregatorId'], transaction })
    if (checkAggregatorExists) throw new AppError(Errors.AGGREGATOR_EXISTS)

    const createAggregator = await createNewEntity({
      model: db.CasinoAggregator,
      data: { name, isActive },
      transaction
    })

    return { createAggregator, message: SUCCESS_MSG.CREATE_SUCCESS }
  }
}
