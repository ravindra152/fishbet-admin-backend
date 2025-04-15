import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { getOne, updateEntity } from '@src/services/helper/crud'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'

const schema = {
  type: 'object',
  properties: {
    rating: { type: 'number' },
    status: { type: 'boolean' },
    reviewId: { type: 'number' },
    userName: { type: 'string' },
    description: { type: 'string' }
  },
  required: ['reviewId', 'status', 'rating', 'userName', 'description']
}



export class UpdateReviewHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { rating, userName, description, reviewId, status } = this.args
    const transaction = this.context.sequelizeTransaction

    const reviewDetails = await getOne({ model: db.Review, data: { reviewId }, attributes: ['reviewId'], transaction })
    if (!reviewDetails) throw new AppError(Errors.REVIEW_NOT_FOUND)

    await updateEntity({
      model: db.Review,
      data: { rating, userName, description, status },
      values: { reviewId },
      transaction
    })

    return { success: true, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}
