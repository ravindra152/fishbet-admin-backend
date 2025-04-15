import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import Jwt from 'jsonwebtoken'

import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import config from '@src/configs/app.config'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'
import { getOne, updateEntity } from '@src/services/helper/crud'
import { EMAIL_SUBJECTS, EMAIL_TEMPLATE_TYPES } from '@src/utils/constant'
import { createEmailWithDynamicValues, getSendGridCredentials, sendDynamicMail } from '@src/services/helper/email'

const schema = {
  type: 'object',
  properties: {
    email: { type: 'string' }
  },
  required: ['email']
}



export class ForgetPasswordHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    let { email } = this.args

    email = email.toLowerCase()
    const userExist = await getOne({
      model: db.AdminUser,
      data: { email },
      attributes: ['adminUserId', 'email', 'adminUsername']
    })

    if (!userExist) throw new AppError(Errors.ADMIN_NOT_FOUND)

    const newPasswordKey = Jwt.sign({
      userId: userExist?.adminUserId,
      username: userExist?.adminUsername
    }, config.get('jwt.resetPasswordKey'), { expiresIn: config.get('jwt.resetPasswordExpiry') })

    const credentials = await getSendGridCredentials()

    if (Object.keys(credentials).length !== 2) {
      throw new AppError(Errors.CREDENTIALS_NOT_FOUND)
    }

    const dynamicEmail = await createEmailWithDynamicValues({
      language: 'EN',
      emailType: EMAIL_TEMPLATE_TYPES.VALUE_T0_INT[EMAIL_TEMPLATE_TYPES.RESET_PASSWORD],
      userId: userExist?.adminUserId,
      serviceData: {
        link: `${config.get('webApp.baseUrl')}/reset-password?newPasswordKey=${newPasswordKey}`,
        subject: EMAIL_SUBJECTS.EN.reset
      }
    })

    const forgetPasswordEmailSent = await sendDynamicMail({
      user: userExist,
      credentials,
      subject: EMAIL_SUBJECTS.EN.reset,
      successMsg: SUCCESS_MSG.RESET_PASSWORD_EMAIL,
      dynamicEmail
    })

    if (forgetPasswordEmailSent.success) {
      await updateEntity({ model: db.AdminUser, data: { resetPasswordToken: newPasswordKey, resetPasswordSentAt: new Date() }, values: { adminUserId: userExist.adminUserId } })
    }

    return { forgetPasswordEmailSent, message: SUCCESS_MSG.CREATE_SUCCESS }
  }
}
