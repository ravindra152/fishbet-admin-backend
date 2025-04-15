import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { getOne, updateEntity } from '@src/services/helper/crud'
import { sendEmail } from '@src/services/helper/email'
import { EMAIL_SUBJECTS, EMAIL_TEMPLATE_TYPES, STATUS, STATUS_VALUE } from '@src/utils/constant'
import { SUCCESS_MSG } from '@src/utils/success'


export class RequestDocumentHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const { documentLabelId, userId, reRequested, reason, user, labelName } = this.args
    const transaction = this.context.sequelizeTransaction

    let label = [documentLabelId]
    // let kycStatus = STATUS_VALUE.PENDING
    // let updateObject = { kycStatus }
    let requestedDocuments = [documentLabelId]

    const userData = await getOne({
      model: db.User,
      data: { userId },
      include: [
        { model: db.UserDocument, as: 'userDocuments', attributes: ['userDocumentId'] },
        // { model: db.Wallet, as: 'userWallet' },
        {
          model: db.UserDetails,
          as: 'userDetails',
          attributes: ['documentLabels', 'id']
        }
      ],
      transaction
    })

    if (!userData) throw new AppError(Errors.USER_NOT_EXISTS)

    if (reRequested) {
      await updateEntity({
        model: db.UserDocument,
        values: { userDocumentId: documentLabelId },
        data: { status: STATUS.REREQUESTED, reason, actionee: user.email, actionPerformedAt: Date.now() },
        transaction
      })
    } else {
      if (userData.userDetails.documentLabels) label = [documentLabelId, ...userData.userDetails.documentLabels]
      if (userData.userDetails.requestedDocuments) requestedDocuments = [documentLabelId, ...userData.userDetails.requestedDocuments]

      // if (userData.userDocuments.length === 0 &&
      //   (userData.kycStatus === STATUS_VALUE.APPROVED || userData.kycStatus === STATUS_VALUE.RE_REQUESTED)) {
      //   kycStatus = STATUS_VALUE.RE_REQUESTED
      // }

      // updateObject = { ...updateObject }
    }

    await userData.set({ kycStatus: STATUS_VALUE.PENDING }).save({ transaction })
    await userData.userDetails.set({ requestedDocuments, documentLabels: label }).save({ transaction })

    await sendEmail({
      user: userData,
      emailTemplate: EMAIL_TEMPLATE_TYPES.KYC_REQUESTED,
      data: { subject: EMAIL_SUBJECTS[userData.locale].kycRequested || EMAIL_SUBJECTS.EN.kycRequested, kycLabels: labelName }
    })

    return { success: true, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}
