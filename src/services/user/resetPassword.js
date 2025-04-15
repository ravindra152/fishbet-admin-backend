import config from '@src/configs/app.config'
import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { getOne, updateEntity } from '@src/services/helper/crud'
import { sendEmail } from '@src/services/helper/email'
import { EMAIL_SUBJECTS, EMAIL_TEMPLATE_TYPES } from '@src/utils/constant'
import { SUCCESS_MSG } from '@src/utils/success'
import Jwt from 'jsonwebtoken'



export class ResetUserPasswordHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const { userId } = this.args
    const transaction = this.context.sequelizeTransaction

    const userDetails = await getOne({
      model: db.User,
      data: { userId },
      attributes: ['userId', 'email', 'locale', 'isEmailVerified', 'uniqueId', 'username'],
      transaction
    })

    if (!userDetails) throw new AppError(Errors.USER_NOT_EXISTS)
    if (!userDetails.isEmailVerified) throw new AppError(Errors.EMAIL_NOT_VERIFIED)

    const newPasswordKey = Jwt.sign({
      userId: userDetails.uniqueId
    }, config.get('jwt.resetPasswordKey'), { expiresIn: config.get('jwt.resetPasswordExpiry') })

    const forgetPasswordEmailSent = await sendEmail({
      user: userDetails,
      emailTemplate: EMAIL_TEMPLATE_TYPES.RESET_PASSWORD,
      data: {
        link: `${config.get('app.userBackendUrl')}/reset-password?newPasswordKey=${newPasswordKey}`,
        subject: (userDetails.locale) ? EMAIL_SUBJECTS[userDetails.locale].reset || EMAIL_SUBJECTS.EN.reset : EMAIL_SUBJECTS.EN.reset
      },
      message: SUCCESS_MSG.RESET_PASSWORD_EMAIL
    })

    if (forgetPasswordEmailSent.message.status === 200) {
      await updateEntity({ model: db.User, data: { newPasswordKey, newPasswordRequested: new Date() }, values: { userId }, transaction })
    }

    return { forgetPasswordEmailSent, message: SUCCESS_MSG.EMAIL_SUCCESS }
  }
}
