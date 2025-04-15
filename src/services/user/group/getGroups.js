import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { pageValidation } from '@src/utils/common'
import { SUCCESS_MSG } from '@src/utils/success'
import { Op } from 'sequelize'


export class GetGroupsHandler extends BaseHandler {

  async run() {
    let { limit, pageNo, search, isActive } = this.args
    let query

    const { page, size } = pageValidation(pageNo, limit)
    if (search) {
      search = search.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_')
      query = {
        ...query,
        name: {
          EN: {
            [Op.iLike]: `%${search}%`
          }
        }
      }
    }
    if (isActive) query = { ...query, isActive }

    const groups = await db.Group.findAndCountAll({
      where: query,
      limit: size,
      offset: ((page - 1) * size),
      order: [['createdAt', 'DESC']]
    })

    if (!groups) throw new AppError(Errors.USER_NOT_EXISTS)

    return { groups, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
