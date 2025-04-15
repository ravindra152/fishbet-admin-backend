import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'
import { pageValidation } from '@src/utils/common'
import { Op, Sequelize } from 'sequelize'

const schema = {
  type: 'object',
  properties: {
    search: { type: ['string', 'null'] },
    limit: { type: ['string', 'null'] },
    pageNo: { type: ['string', 'null'] },
    isActive: {
      enum: ['true', 'false', '', 'null']
    }
  }
}



export class GetAllProvidersHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const { search, pageNo, limit, isActive } = this.args
    let page, size, query = {}, providerList
    if (search) {
      query[`name.EN`] = { [Op.iLike]: `%${search}%` }
    }


    if (pageNo && limit) {
      const values = pageValidation(pageNo, limit)
      page = values.page
      size = values.size
    }
    if (isActive && (isActive !== '' || isActive !== null)) query = { ...query, isActive }
    if (page && size) {
      providerList = await db.CasinoProvider.findAndCountAll({
        where: query,
        order: [['name', 'ASC']],
        attributes: ['name', 'id', 'isActive', 'thumbnailUrl', 'mobileThumbnailUrl', 'gameAggregatorId'],
        limit: size,
        offset: ((page - 1) * size),
        include: {
          model: db.CasinoAggregator,
          attributes: { exclude: ['updatedAt', 'createdAt'] }
        }
      })
    } else {
      providerList = await db.CasinoProvider.findAndCountAll({
        order: [['name', 'ASC']],
        where: query,
        attributes: ['name', 'id', 'isActive', 'thumbnailUrl', 'mobileThumbnailUrl', 'gameAggregatorId']
      })
    }
    if (!providerList) throw new AppError(Errors.CASINO_PROVIDER_NOT_FOUND)

    return { providerList, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
