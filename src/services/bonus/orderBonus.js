import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import { Op } from 'sequelize'

import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { getAll } from '@src/services/helper/crud'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'

const schema = {
  type: 'object',
  properties: {
    order: { type: 'array' }
  },
  required: ['order']
}



export class OrderBonusHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    let { order } = this.args
    order = [...(new Set(order))]
    const promises = []

    await db.Bonus.update({ orderId: null }, {
      where: { orderId: { [Op.not]: null } }
    })

    const bonuses = await getAll({
      model: db.Bonus,
      data: { bonusId: { [Op.in]: order } },
      attributes: ['bonusId', 'orderId']
    })

    if (!bonuses) throw new AppError(Errors.BONUS_NOT_FOUND)

    bonuses.forEach(async (bonus) => {
      if (order.indexOf(bonus.bonusId) !== -1) {
        promises.push(bonus.set({ orderId: order.indexOf(bonus.bonusId) + 1 }).save())
      }
    })

    await Promise.all(promises)

    return { success: true, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}
