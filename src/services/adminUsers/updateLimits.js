import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { getOne } from '@src/services/helper/crud'
import { BaseHandler } from '@src/libs/logicBase'

const schema = {
  type: 'object',
  properties: {
    updateLimit: { type: 'array' }
  },
  required: ['updateLimit']
}



export class UpdateLimitsHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { updateLimit } = this.args
    const transaction = this.context.sequelizeTransaction
    const loyaltyPoint = {}

    updateLimit.forEach(currency => {
      loyaltyPoint[currency.code] = currency.loyaltyPoint
    })

    const globalConfiguration = await getOne({
      model: db.GlobalSetting,
      data: { key: 'LOYALTY_LEVEL' },
      attributes: ['value'],
      transaction
    })

    if (!globalConfiguration) throw new AppError(Errors.TENANT_CONFIGURATION_NOT_FOUND)
    const updateLoyaltyPoints = await globalConfiguration.set({ loyaltyPoint }).save({ transaction })

    return { loyaltyPoint: updateLoyaltyPoints.loyaltyPoint }
  }
}
