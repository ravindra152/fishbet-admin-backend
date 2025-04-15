import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import { getOne } from '@src/services/helper/crud'
import { BaseHandler } from '@src/libs/logicBase'
import { EMAIL_TEMPLATE_PRIMARY_STATUS } from '@src/utils/constant'

const schema = {
  type: 'object',
  properties: {
    emailTemplateId: { type: 'number' }
  },
  required: ['emailTemplateId']
}



export class DeleteEmailTemplateHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { emailTemplateId } = this.args
    const transaction = this.context.sequelizeTransaction

    const emailTemplate = await getOne({ model: db.EmailTemplate, data: { emailTemplateId }, transaction })
    if (!emailTemplate) throw new AppError(Errors.EMAIL_TEMPLATE_NOT_FOUND)

    if (emailTemplate.isPrimary === EMAIL_TEMPLATE_PRIMARY_STATUS.PRIMARY) {
      throw new AppError(Errors.PRIMARY_EMAIL)
    }

    await emailTemplate.destroy({ transaction })
    return { success: true }
  }
}
