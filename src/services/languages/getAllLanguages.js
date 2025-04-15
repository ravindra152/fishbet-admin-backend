import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'
import { filterByLanguageName, pageValidation } from '@src/utils/common'

const schema = {
  type: 'object',
  properties: {
    name: { type: ['string', 'null'] },
    limit: { type: ['string', 'null'] },
    pageNo: { type: ['string', 'null'] }
  }
}



export class GetLanguagesHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    let query, languages
    const { limit, pageNo, name } = this.args

    if (name) query = filterByLanguageName(query, name)

    if (pageNo && limit) {
      const { page, size } = pageValidation(pageNo, limit)

      languages = await db.Language.findAndCountAll({
        order: [['languageId', 'ASC']],
        limit: size,
        offset: ((page - 1) * size),
        where: query
      })
    } else {
      languages = await db.Language.findAndCountAll({
        order: [['languageId', 'ASC']],
        attributes: ['languageId', 'languageName', 'code'],
        where: query
      })
    }

    if (!languages) throw new AppError(Errors.LANGUAGE_NOT_FOUND)

    return { languages, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
