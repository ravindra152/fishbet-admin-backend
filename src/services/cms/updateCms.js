import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { getOne, updateEntity } from '@src/services/helper/crud'
import { SUCCESS_MSG } from '@src/utils/success'

export class UpdateCmsPageHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const { cmsPageId, title, slug, content, isActive, category, language = "EN" } = this.args
    const transaction = this.context.sequeizeTransaction

    const data = {}
    const checkCmsExist = await getOne({ model: db.CmsPage, data: { cmsPageId }, transaction })
    if (!checkCmsExist) throw new AppError(Errors.CMS_NOT_FOUND)
    if (slug) {
      const checkCmsSlugExist = await getOne({ model: db.CmsPage, data: { slug }, transaction })
      if (checkCmsSlugExist && checkCmsSlugExist.cmsPageId !== cmsPageId) throw new AppError(Errors.CMS_EXISTS)
      data.slug = slug
    }
    if (title) {
      data.title = { [language]: title }
    }
    if (content) {
      data.content = { [language]: content }
    }
    if (isActive != undefined) {
      data.isActive = isActive
    }
    if (category) {
      data.category = category
    }
    const updateCmsPage = await updateEntity({ model: db.CmsPage, data, values: { cmsPageId }, transaction })

    return { updateCmsPage, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}
