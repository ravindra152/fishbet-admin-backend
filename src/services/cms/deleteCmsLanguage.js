import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import { getOne } from '@src/services/helper/crud'
import { BaseHandler } from '@src/libs/logicBase'

const schema = {
  type: 'object',
  properties: {
    language: { type: 'string' },
    cmsPageId: { type: 'number' }
  },
  required: ['cmsPageId', 'language']
}



export class DeleteCmsLanguageHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { cmsPageId, language } = this.args
    const transaction = this.context.sequelizeTransaction
    let query

    query = { cmsPageId }

    const cmsPage = await getOne({ model: db.CmsPage, data: query, transaction })
    if (!cmsPage) throw new AppError(Errors.CMS_NOT_FOUND)

    if (language === 'EN') throw new AppError(Errors.ACTION_NOT_ALLOWED)

    delete cmsPage.title[language]
    delete cmsPage.content[language]

    await cmsPage.set({ title: cmsPage.title }).save({ transaction })
    await cmsPage.set({ content: cmsPage.content }).save({ transaction })

    return { success: true }
  }
}
