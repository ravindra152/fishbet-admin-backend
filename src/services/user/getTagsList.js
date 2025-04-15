import db from '@src/db/models'
import { SUCCESS_MSG } from '@src/utils/success'
import { BaseHandler } from '@src/libs/logicBase'

export class GetTagsHandler extends BaseHandler {
  async run () {
    const query = { where: { key: 'TAGS' } }
    const globalSetting = await db.GlobalSetting.findOne({ ...query, attributes: ['value'] })
    const tags = globalSetting.value
    return { tags, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
