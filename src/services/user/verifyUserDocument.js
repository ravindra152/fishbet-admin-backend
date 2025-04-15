import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { getAll, getOne, updateEntity } from '@src/services/helper/crud'
import { sendEmail } from '@src/services/helper/email'
import { getUserDetails } from '@src/utils/common'
import { EMAIL_SUBJECTS, EMAIL_TEMPLATE_TYPES, STATUS, STATUS_VALUE } from '@src/utils/constant'
import { SUCCESS_MSG } from '@src/utils/success'
import { Op } from 'sequelize'

export class VerifyUserDocumentHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    let { userId, userDocumentId, status, reason, user } = this.args
    const transaction = this.context.sequelizeTransaction
    let emailSent
    let emailTemplate, emailData

    const userExist = await getUserDetails({ userId, transaction })
    if (!userExist) throw new AppError(Errors.USER_NOT_EXISTS)

    const checkDocumentExist = await getOne({ model: db.UserDocument, data: { userDocumentId, userId: userExist.userId }, transaction })

    if (!checkDocumentExist) throw new AppError(Errors.USER_DOCUMENTS_NOT_FOUND)

    if (status.toUpperCase() === STATUS_VALUE.APPROVED) {
      status = STATUS.APPROVED,
        await userExist.set({ level: checkDocumentExist.level }).save({ transaction })
    } else if (status.toUpperCase() === STATUS_VALUE.REJECTED) {
      status = STATUS.REJECTED

      if (userExist.level === 2 && userExist.affiliateStatus === true) {
        await userExist.set({ kycStatus: STATUS_VALUE.REJECTED, level: checkDocumentExist.level - 1, affiliateStatus: false }).save({ transaction })
      } else {
        await userExist.set({ kycStatus: STATUS_VALUE.REJECTED, level: checkDocumentExist.level - 1 }).save({ transaction })
      }

      emailTemplate = EMAIL_TEMPLATE_TYPES.KYC_REJECTED
      emailData = {
        subject: EMAIL_SUBJECTS[userExist.locale || 'EN'].kycRejected || EMAIL_SUBJECTS.EN.kycRejected,
        kycLabels: checkDocumentExist.documentName,
        reason
      }
    }

    const updateUserDocument = await updateEntity({
      model: db.UserDocument,
      values: { userDocumentId },
      data: { status, reason, actionee: user.email, actionPerformedAt: Date.now() },
      transaction
    })

    if (userExist.kycStatus === STATUS_VALUE.REQUESTED) {
      const documentLabel = await getAll({
        model: db.DocumentLabel,
        data: { documentLabelId: { [Op.in]: userExist.userDetails.documentLabels } },
        attributes: ['name'],
        transaction
      })
      const total = documentLabel.length
      const count = await db.UserDocument.count({ where: { userId: userExist.userId, status: STATUS.APPROVED }, transaction })

      if (count === total) {
        await userExist.set({ kycStatus: STATUS_VALUE.APPROVED }).save({ transaction })

        emailTemplate = EMAIL_TEMPLATE_TYPES.KYC_VERIFIED
        emailData = { subject: EMAIL_SUBJECTS[userExist.locale].kycVerified || EMAIL_SUBJECTS.EN.kycVerified }
      }
    }

    // if (emailTemplate && emailData) emailSent = await sendEmail({ user: userExist, emailTemplate, data: emailData, credentials })
    if (emailTemplate && emailData) emailSent = await sendEmail({ user: userExist, emailTemplate, data: emailData })
    return { updateUserDocument, emailSent, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }

  catch(error) {
    console.log(error)
    this.addError('InternalServerErrorType', error)
  }
}
