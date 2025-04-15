import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import { Op } from 'sequelize'
import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'
import { pageValidation } from '@src/utils/common'

const schema = {
  type: 'object',
  properties: {
    limit: { type: 'string' },
    pageNo: { type: 'string' },
    status: {
      type: ['string'],
      enum: ['true', 'false', 'null', '']
    },
    search: { type: ['string', 'null'] }
  },
  required: ['limit', 'pageNo']
}



export class GetAllReviewHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { limit, pageNo, status, search } = this.args
    let query

    const { page, size } = pageValidation(pageNo, limit)

    if (status) query = { ...query, status }
    if (search) query = { ...query, userName: { [Op.iLike]: `%${search}%` } }

    const reviewDetails = await db.Review.findAndCountAll({
      where: query,
      order: [['reviewId', 'DESC']],
      limit: size,
      offset: ((page - 1) * size)
    })

    if (!reviewDetails) throw new AppError(Errors.REVIEW_NOT_FOUND_ERROR_TYPE)

    return { reviewDetails, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
