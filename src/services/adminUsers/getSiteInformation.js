import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { decodeCredential } from '@src/utils/common'
import { SUCCESS_MSG } from '@src/utils/success'

export class GetSiteInformationHandler extends BaseHandler {
  async run () {
    const siteInformation = await db.GlobalSetting.findOne({ where: { key: ['SITE_INFORMATION'] }, attributes: ['key', 'value'], raw: true })

    return { siteInformation, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
