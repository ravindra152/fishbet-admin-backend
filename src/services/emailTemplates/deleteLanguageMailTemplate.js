import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { getOne } from '@src/services/helper/crud'
import { BaseHandler } from '@src/libs/logicBase'

const schema = {
  type: 'object',
  properties: {
    userType: { type: 'string' },
    language: { type: 'string' },
    emailTemplateId: { type: 'number' }
  },
  required: ['userType', 'emailTemplateId', 'language']
}



export class DeleteEmailTemplateLanguageHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { emailTemplateId, language } = this.args
    const transaction = this.context.sequelizeTransaction
    let query

    query = { emailTemplateId }

    const emailTemplate = await getOne({ model: db.EmailTemplate, data: query, transaction })
    if (!emailTemplate) throw new AppError(Errors.EMAIL_TEMPLATE_NOT_FOUND)

    if (language === 'EN') throw new AppError(Errors.PRIMARY_EMAIL)

    delete emailTemplate.templateCode[language]
    await emailTemplate.set({ templateCode: emailTemplate.templateCode }).save({ transaction })

    return { success: true }
  }
}
