import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'
import { pageValidation } from '@src/utils/common'

export class GetReferredUsersHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const { userId, limit = 10, pageNo = 1 } = this.args
    const { page, size } = pageValidation(pageNo, limit)

    const referredUsers = await db.User.findAndCountAll({
      where: { refParentId: userId },
      attributes: { exclude: ['password'] },
      include: [
        {
          model: db.UserAffiliations,
          as: 'affiliation',
          attributes: ['earnedCommission'],
          where: { affiliateUserId: userId }
        }
      ],
      limit: size,
      offset: (page - 1) * size,
      order: [['createdAt', 'DESC']]
    })

    const totalCommission = await db.UserAffiliations.sum('earnedCommission', {
      where: { affiliateUserId: userId }
    })


    return {
      referredUsers,
      totalCommission: totalCommission || 0,
      message: SUCCESS_MSG.GET_SUCCESS
    }
  }
}
