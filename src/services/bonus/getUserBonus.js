import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { pageValidation } from '@src/utils/common'

export class GetUserBonusHandler extends BaseHandler {
  async run () {
    const { limit, pageNo, userId, status, bonusType, bonusId } = this.args
    let query = { }; let bonusQuery

    const { page, size } = pageValidation(pageNo, limit)
    if (userId) query.userId = userId
    if (bonusId) query.bonusId = bonusId
    if (status && status !== 'all') query = { ...query, bonusStatus: status }
    if (bonusType && bonusType !== 'all') bonusQuery = { bonusType }

    const userBonus = await db.UserBonus.findAndCountAll({
      where: { ...query },
      order: [['createdAt', 'DESC']],
      include: [{
        model: db.Bonus,
        where: bonusQuery,
        as: 'bonus',
        attributes: ['id', 'promotionTitle', 'bonusType']
      }, {
        model: db.User,
        as: 'user',
        attributes: ['userId', 'username']
      }],
      limit: size,
      offset: ((page - 1) * size)
    })

    if (!userBonus) throw new AppError(Errors.USER_BONUS_NOT_FOUND)

    return { userBonus }
  }
}
