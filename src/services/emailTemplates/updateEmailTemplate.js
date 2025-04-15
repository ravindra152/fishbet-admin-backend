import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { getOne } from '@src/services/helper/crud'
import { BaseHandler } from '@src/libs/logicBase'

const schema = {
  type: 'object',
  properties: {
    label: { type: 'string' },
    templateCode: { type: 'object' },
    emailTemplateId: { type: 'string' },
    dynamicData: { type: ['array', 'null'] }
  },
  required: ['id', 'label', 'emailTemplateId', 'templateCode']
}



export class UpdateEmailTemplateHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { label, dynamicData, templateCode, emailTemplateId } = this.args
    const transaction = this.context.sequelizeTransaction
    let query

    query = { isDefault: true }

    const checkTemplateExists = await getOne({ model: db.EmailTemplate, data: { ...query, emailTemplateId }, transaction })
    if (!checkTemplateExists) throw new AppError(Errors.EMAIL_TEMPLATE_NOT_FOUND)

    const templateData = { label, dynamicData, templateCode: templateCode }
    const emailTemplate = await checkTemplateExists.set(templateData).save({ transaction })

    return { emailTemplate }
  }
}
