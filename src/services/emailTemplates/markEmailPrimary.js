import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import { getOne } from '@src/services/helper/crud'
import { BaseHandler } from '@src/libs/logicBase'
import { EMAIL_TEMPLATE_PRIMARY_STATUS } from '@src/utils/constant'

const schema = {
  type: 'object',
  properties: {
    emailTemplateId: { type: 'number' },
    type: {
      type: 'number',
      enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
    }
  },
  required: ['id', 'emailTemplateId', 'type']
}



export class MarkEmailPrimaryHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { emailTemplateId, type } = this.args

    const checkTemplateExists = await getOne({ model: db.EmailTemplate, data: { emailTemplateId, type } })
    if (!checkTemplateExists) throw new AppError(Errors.EMAIL_TEMPLATE_NOT_FOUND)

    if (checkTemplateExists.isPrimary === EMAIL_TEMPLATE_PRIMARY_STATUS.PRIMARY) {
      throw new AppError(Errors.PRIMARY_TEMPLATE)
    }

    await db.EmailTemplate.update({ isPrimary: EMAIL_TEMPLATE_PRIMARY_STATUS.DISABLE }, { where: { type } })
    const emailTemplate = await checkTemplateExists.set({ isPrimary: EMAIL_TEMPLATE_PRIMARY_STATUS.PRIMARY }).save()

    return { emailTemplate }
  }
}
