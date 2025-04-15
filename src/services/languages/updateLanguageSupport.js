import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'
import { createNewEntity, getOne } from '@src/services/helper/crud'

const schema = {
  type: 'object',
  properties: {
    data: { type: 'object' },
    userType: { type: 'string' },
    type: {
      type: 'string',
      enum: ['key', 'language', 'create']
    }
  },
  required: ['userType', 'data', 'type']
}



export class UpdateLanguageSupportHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    let { type, data } = this.args
    const query = {}

    if (typeof (data) === 'string') data = JSON.parse(data)

    if (type === 'key') {
      const keys = Object.keys(data)

      keys.forEach(async key => {
        const languages = Object.keys(data[key])

        for (const language of languages) {
          const updateData = {}
          updateData[key] = data[key][language]
          await db.MultiLanguageSupport.update(updateData, { where: { language, ...query } })
        }
      })
    } else if (type === 'language') {
      const language = await getOne({ model: db.MultiLanguageSupport, data: { language: data.language, ...query } })
      if (!language) throw new AppError(Errors.LANGUAGE_NOT_FOUND)

      await language.set(data).save()
    } else if (type === 'create') {
      await createNewEntity({ model: db.MultiLanguageSupport, data: { ...data } })
    }

    return { success: true, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
