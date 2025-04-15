import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'
import { updateEntity } from '@src/services/helper/crud'

const schema = {
  type: 'object',
  properties: {
    loyaltyLevel: { type: 'array' }
  },
  required: ['loyaltyLevel']
}



export class UpdateLoyaltyLevelHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { loyaltyLevel } = this.args

    loyaltyLevel[0].startPoint = 0
    const updateLoyaltyLevel = await updateEntity({
      model: db.GlobalSetting,
      data: { value: loyaltyLevel },
      values: { key: 'LOYALTY_LEVEL' }
    })

    return { updateLoyaltyLevel, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
