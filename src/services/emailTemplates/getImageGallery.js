import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'

export class GetGalleryHandler extends BaseHandler {
   async run () {
    const gallery = (await db.GlobalSetting.findOne({
      attributes: ['key', 'value'],
      where: { key: 'ADMIN_GALLERY' },
      raw: true
    }))?.value

    return { gallery }
  }
}
