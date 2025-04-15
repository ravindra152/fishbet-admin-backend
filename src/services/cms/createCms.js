import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'
import { createNewEntity, getOne } from '@src/services/helper/crud'


export class CreateCmsPageHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {

    const { title, slug, content, isActive, category } = this.args
    const transaction = this.context.sequelizeTransaction

    const checkCmsExist = await getOne({
      model: db.CmsPage,
      data: { slug },
      transaction
    })

    if (checkCmsExist) throw new AppError(Errors.CMS_EXISTS)
    await createNewEntity({
      model: db.CmsPage,
      data: {
        title,
        slug,
        content,
        isActive,
        category
      },
      transaction
    })

    return { success: true, message: SUCCESS_MSG.CREATE_SUCCESS }
  }
}
