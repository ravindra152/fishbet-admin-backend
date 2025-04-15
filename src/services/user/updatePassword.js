import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { deleteCache } from '@src/libs/redis'
import { getOne } from '@src/services/helper/crud'
import { sendEmail } from '@src/services/helper/email'
import { encryptPassword } from '@src/utils/common'
import { EMAIL_SUBJECTS, EMAIL_TEMPLATE_TYPES, ROLE } from '@src/utils/constant'
import { SUCCESS_MSG } from '@src/utils/success'

export class UpdatePasswordHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const { userId, password } = this.args
    const transaction = this.context.sequelizeTransaction

    const userDetails = await getOne({
      model: db.User,
      data: { userId },
      attributes: ['userId', 'email', 'password', 'uniqueId', 'locale', 'username'],
      transaction
    })

    if (!userDetails) throw new AppError(Errors.USER_NOT_EXISTS)

    await userDetails.set({ password: encryptPassword(password) }).save({ transaction })
    await deleteCache(`${ROLE.USER}:${userDetails.uniqueId}`)

    const mailSent = await sendEmail({
      user: userDetails,
      emailTemplate: EMAIL_TEMPLATE_TYPES.UPDATE_PASSWORD,
      data: { subject: (userDetails.locale) ? EMAIL_SUBJECTS[userDetails.locale].passwordUpdated || EMAIL_SUBJECTS.EN.passwordUpdated : EMAIL_SUBJECTS.EN.passwordUpdated, newPassword: Buffer.from(password, 'base64').toString('ascii') }
    })

    return { success: true, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}
