import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import { getOne } from '@src/services/helper/crud'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'

const schema = {
  type: 'object',
  properties: {
    user: { type: 'object' },
    cmsPageId: {
      type: 'string',
      pattern: '^[0-9]+$'
    }
  },
  required: ['user', 'cmsPageId']
}



export class GetCmsPageHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { cmsPageId } = this.args
    const query = { cmsPageId }

    const cmsDetails = await getOne({ model: db.CmsPage, data: query })
    if (!cmsDetails) throw new AppError(Errors.CMS_NOT_FOUND)

    return { cmsDetails, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
