import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { createNewEntity } from '@src/services/helper/crud'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'

const schema = {
  type: 'object',
  properties: {
    rating: { type: 'number' },
    status: { type: 'boolean' },
    userName: { type: 'string' },
    description: { type: 'string' }
  },
  required: ['rating', 'userName', 'status', 'description']
}



export class CreateReviewHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { rating, userName, description, status } = this.args
    const transaction = this.context.sequelizeTransaction

    await createNewEntity({
      model: db.Review,
      data: { rating, userName, description, status },
      transaction
    })

    return { success: true, message: SUCCESS_MSG.CREATE_SUCCESS }
  }
}
