import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { pageValidation } from '@src/utils/common'
import { SUCCESS_MSG } from '@src/utils/success'


export class GetCurrenciesHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const { limit, pageNo } = this.args
    let currencies

    const { page, size } = pageValidation(pageNo, limit)

    if (pageNo && limit) {
      currencies = await db.Currency.findAndCountAll({
        // where: { isActive: true },
        // order: [['currencyId', 'ASC']],
        limit: size,
        offset: ((page - 1) * size)
      })
    } else {
      currencies = await db.Currency.findAndCountAll({
        // where: { isActive: true, isPrimary: true },
        // order: [['currencyId', 'ASC']],
        // attributes: ['currencyId', 'name', 'symbol', 'code']
      })
    }

    if (!currencies) throw new AppError(Errors.CURRENCY_NOT_FOUND)
    return { currencies, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
