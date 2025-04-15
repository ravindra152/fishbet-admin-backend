import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { getOne, createNewEntity } from '@src/services/helper/crud'
import { EMAIL_TEMPLATE_PRIMARY_STATUS } from '@src/utils/constant'

const schema = {
  type: 'object',
  properties: {
    label: { type: 'string' },
    language: { type: 'string' },
    dynamicData: { type: 'array' },
    templateCode: { type: 'string' },
    type: {
      type: 'number',
      enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
    }
  },
  required: ['label', 'type', 'templateCode', 'language', 'dynamicData']
}



export class CreateEmailTemplateHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { label, type, dynamicData, templateCode, language } = this.args
    const newTemplateCode = {}

    const transaction = this.context.sequelizeTransaction

    const checkTemplateExists = await getOne({ model: db.EmailTemplate, data: { label, type }, transaction })
    if (checkTemplateExists) throw new AppError(Errors.EMAIL_TEMPLATE_EXISTS)

    newTemplateCode[language] = templateCode
    const templateData = {
      type,
      label,
      dynamicData,
      templateCode: newTemplateCode,
      isPrimary: EMAIL_TEMPLATE_PRIMARY_STATUS.DISABLE
    }

    const emailTemplate = await createNewEntity({ model: db.EmailTemplate, data: templateData, transaction })

    return { emailTemplate }
  }
}
