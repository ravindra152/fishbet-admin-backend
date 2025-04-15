import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'
import { updateEntity } from '@src/utils/crud'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'

export class toggleCmsIsActiveHandler extends BaseHandler {
  async run () {
    const {cmsPageId} = this.args

    const transaction = this.dbTransaction

    // const data=await updateEntity({
    //   model: db.CmsPage,
    //   values: { cmsPageId},
    //   data: { isActive },
    //   transaction
    // })

    const cmsPage=await db.CmsPage.findOne({
      attributes: ['cmsPageId','isActive'],
      where: {cmsPageId},
      transaction
    })

    if(!cmsPage)
      throw new AppError(Errors.CMS_NOT_FOUND)

    cmsPage.isActive = !cmsPage.isActive
    await cmsPage.save({ transaction })
    return { success: true }

  }
}
