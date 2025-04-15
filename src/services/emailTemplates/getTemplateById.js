import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import { getOne } from '@src/services/helper/crud'
import { BaseHandler } from '@src/libs/logicBase'

const schema = {
  type: 'object',
  properties: {
    emailTemplateId: { type: 'string' }
  },
  required: ['emailTemplateId']
}



export class GetEmailTemplateHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { emailTemplateId } = this.args

    const emailTemplate = await getOne({ model: db.EmailTemplate, data: { emailTemplateId } })
    if (!emailTemplate) throw new AppError(Errors.EMAIL_TEMPLATE_NOT_FOUND)

    return { emailTemplate }
  }
}
