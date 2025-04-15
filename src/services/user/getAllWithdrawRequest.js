import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { Op } from 'sequelize'
import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { filterByDate, filterByEmailName, pageValidation } from '@src/utils/common'
import { SUCCESS_MSG } from '@src/utils/success'

const schema = {
  type: 'object',
  properties: {
    limit: { type: 'string' },
    pageNo: { type: 'string' },
    search: { type: ['string', 'null'] },
    endDate: { type: ['string', 'null'] },
    startDate: { type: ['string', 'null'] },
    paymentProvider: { type: ['string', 'null'] },
    status: { type: ['string'], enum: ['0', '5', '2', 'null', ''] }
  }
}


export class GetWithdrawRequestHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { limit, pageNo, status, search, startDate, endDate, paymentProvider } = this.args
    let query

    const { page, size } = pageValidation(pageNo, limit)

    if (startDate || endDate) query = filterByDate(query, startDate, endDate, 'WithdrawRequest')
    if (search) query = filterByEmailName(query, search)
    if (status && (status !== '' || status !== null)) query = { ...query, status }

    if (paymentProvider) {
      const name = paymentProvider.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_')
      query = { ...query, paymentProvider: { [Op.iLike]: `%${name}%` } }
    }

    const withdrawRequest = await db.WithdrawRequest.findAndCountAll({
      order: [['createdAt', 'DESC']],
      where: query,
      include: { model: db.User, attributes: ['currencyCode'] },
      attributes: { exclude: ['accountNumber', 'ifscCode', 'phoneNumber', 'actionableId'] },
      limit: size,
      offset: ((page - 1) * size)
    })

    if (!withdrawRequest) throw new AppError(Errors.WITHDRAW_REQUEST_NOT_FOUND)

    return { withdrawRequest, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
