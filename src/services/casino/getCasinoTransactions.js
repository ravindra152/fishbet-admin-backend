import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'




export class GetCasinoTransactionsHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const {
      pageNo,
      limit,
      startDate,
      endDate,
      currencyCode,
      transactionType,
      email,
      csvDownload,
      userId,
      status
    } = this.args


    const transactionDetail = await db.CasinoTransaction.findAndCountAll({
      where: query,
      attributes: { exclude: ['updatedAt'] },
      limit: size,
      offset: ((page - 1) * size),
      order: [['createdAt', 'DESC']],
      include: [
        { model: db.TransactionLedger },
        { model: db.User, attributes: ['email', 'username'] },
        { model: db.CasinoGame, attributes: ['name'] }
      ]
    })

    return { transactionDetail, message: SUCCESS_MSG.GET_SUCCESS }
  }

}