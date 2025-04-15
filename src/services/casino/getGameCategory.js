import { Op } from 'sequelize'
import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'
import { pageValidation } from '@src/utils/common'


export class GetAllGameCategoryHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { limit, pageNo, search, isActive } = this.args

    let query
    const { page, size } = pageValidation(pageNo, limit)

    if (search) {
      let categoryName = search
      categoryName = categoryName.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_')

      query = { ...query, name: { EN: { [Op.iLike]: `%${categoryName}%` } } }
    }
    if (isActive && (isActive !== '' || isActive !== null)) query = { ...query, isActive }

    let casinoCategories
    if (pageNo && limit) {
      casinoCategories = await db.CasinoCategory.findAndCountAll({
        where: query,
        order: [['orderId', 'ASC']],
        limit: size,
        offset: ((page - 1) * size)
      })
    } else {
      casinoCategories = await db.CasinoCategory.findAndCountAll({
        where: query,
        order: [['orderId', 'ASC']]
      })
    }

    return { casinoCategories, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
