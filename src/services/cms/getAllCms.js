import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import { Op } from 'sequelize'

import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'
import { pageValidation } from '@src/utils/common'

const schema = {
  type: 'object',
  properties: {
    limit: { type: ['string', 'null'] },
    pageNo: { type: ['string', 'null'] },
    search: { type: ['string', 'null'] },
    isActive: {
      type: ['string', 'null'],
      enum: ['true', 'false', '', 'null']
    },
    language: { type: ['string', 'null'] }
  }
}



export class GetAllCmsPageHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    let query
    let { limit, pageNo, search, language, isActive } = this.args

    const { page, size } = pageValidation(pageNo, limit)

    if (search) {
      if (!language) language = 'EN'
      search = search.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_')

      query = {
        ...query,
        [Op.or]: [{ title: { [`${language}`]: { [Op.iLike]: `%${search}%` } } },
          { slug: { [Op.iLike]: `%${search}%` } }
        ]
      }
    }
    if (isActive && (isActive !== '' || isActive !== null)) query = { ...query, isActive }

    const cmsPages = await db.CmsPage.findAndCountAll({
      order: [['createdAt', 'DESC']],
      where: query,
      limit: size,
      offset: ((page - 1) * size)
    })

    if (!cmsPages) throw new AppError(Errors.CMS_NOT_FOUND)

    return { cmsPages, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
