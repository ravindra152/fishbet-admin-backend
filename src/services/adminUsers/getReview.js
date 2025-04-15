import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { getOne } from '@src/services/helper/crud'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'

const schema = {
  type: 'object',
  properties: {
    reviewId: { type: 'string' }
  },
  required: ['reviewId']
}


export class GetReviewHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { reviewId } = this.args

    const reviewDetails = await getOne({
      model: db.Review,
      data: { reviewId }
    })

    if (!reviewDetails) throw new AppError(Errors.REVIEW_NOT_FOUND_ERROR_TYPE)

    return { reviewDetails, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
