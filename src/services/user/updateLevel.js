import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { sendDynamicEmail } from '@src/services/helper/email'
import { SUCCESS_MSG } from '@src/utils/success'
// import { encryptPassword } from '@src/utils/common'
// import { getSendGridCredentials, sendEmail } from '@src/services/helper/email'
// import { EMAIL_SUBJECTS, EMAIL_TEMPLATE_TYPES, ROLE } from '@src/utils/constant'

export class UpdateUserLevelHandler extends BaseHandler {

  async run() {
    const { userId, level, status } = this.args
    const transaction = this.context.sequelizeTransaction

    const userDetails = await db.User.findOne({
      where: { userId },
      attributes: ['userId', 'email', 'password', 'uniqueId', 'locale', 'username', 'level']
    })

    if (!userDetails) throw new AppError(Errors.USER_NOT_EXISTS)

    if (status) {
      if (userDetails?.level === level - 1) {
        await userDetails.set({ level: level }).save({ transaction })
      } else {
        throw new AppError(Errors.PREVIOUS_LEVEL_NOT_UPDATED)
      }
    } else {
      if (userDetails?.level === level) {
        await userDetails.set({ level: level - 1 }).save({ transaction })
        return { success: true, message: SUCCESS_MSG.UPDATE_SUCCESS }
      } else {
        throw new AppError(Errors.PREVIOUS_LEVEL_NOT_UPDATED)
      }
    }

    // can send mail later
    const emailSent = await sendDynamicEmail({
      recieverEmail: userDetails.email,
      subject: 'KYC Level Updated',
      text: `Your KYC level has been updated to level ${level}`
      // dynamicEmail: emailBodyRaw
    })

    return { success: true, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}
