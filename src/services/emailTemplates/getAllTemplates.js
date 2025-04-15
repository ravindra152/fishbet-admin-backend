import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import { getAll } from '@src/services/helper/crud'
import { BaseHandler } from '@src/libs/logicBase'
import { createEmailTemplateData } from '@src/services/helper/email'
import { EMAIL_TEMPLATE_ORDER } from '@src/utils/constant'

export class GetAllEmailTemplateHandler extends BaseHandler {
  async run () {
    const emailTemplate = await getAll({ model: db.EmailTemplate })
    if (!emailTemplate) throw new AppError(Errors.EMAIL_TEMPLATE_NOT_FOUND)

    return { templateCount: emailTemplate.length, emailTemplateOrder: EMAIL_TEMPLATE_ORDER, emailTemplate: createEmailTemplateData(emailTemplate) }
  }
}
