import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { pageValidation } from '@src/utils/common'
import { SUCCESS_MSG } from '@src/utils/success'
import { Op } from 'sequelize'

export class GetAllBonusHandler extends BaseHandler {

  async run() {
    let { bonusId, pageNo, limit, bonusType, search } = this.args
    let query = {}

    const { page, size } = pageValidation(pageNo, limit)
    if (bonusType) query = { ...query, bonusType }
    if (bonusId) query = { ...query, id: bonusId }

    if (search) {
      search = search.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_');
      query = { 
        ...query, 
        [Op.or]: [
          { promotionTitle: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } }
        ] 
      };
    }

    const bonus = await db.Bonus.findAndCountAll({
      where: query,
      order: [['id', 'ASC']],
      limit: size,
      offset: (page - 1) * size,
      logging: true
    })

    if (!bonus) throw new AppError(Errors.BONUS_NOT_FOUND)

    return { bonus, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
