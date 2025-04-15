import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { getAll, updateEntity } from '@src/services/helper/crud'
import { getUserDetails } from '@src/utils/common'
import { STATUS, STATUS_VALUE } from '@src/utils/constant'
import { SUCCESS_MSG } from '@src/utils/success'
import { Op, Sequelize } from 'sequelize'


export class CancelDocumentRequestHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const { documentLabelId, userId, reRequested } = this.args
    let statusValue = STATUS_VALUE.PENDING
    let data

    const transaction = this.context.transaction

    const userData = await getUserDetails({ userId, transaction })
    if (!userData) throw new AppError(Errors.USER_NOT_EXISTS)

    if (reRequested) {
      await updateEntity({
        model: db.UserDocument,
        values: { userDocumentId: documentLabelId },
        data: { status: STATUS.APPROVED },
        transaction
      })
    } else {
      const index = userData.userDetails.documentLabels.indexOf(documentLabelId)
      const docIndex = userData.userDetails.requestedDocuments.indexOf(documentLabelId)
      userData.userDetails.documentLabels.splice(index, 1)
      userData.userDetails.requestedDocuments.splice(docIndex, 1)

      if (!userData.userDetails.documentLabels.length) userData.userDetails.documentLabels = null
      if (!userData.userDetails.requestedDocuments.length) userData.userDetails.requestedDocuments = null

      data = {
        documentLabels: userData.userDetails.documentLabels,
        requestedDocuments: userData.userDetails.requestedDocuments
      }
    }

    const statusCount = await getAll({
      model: db.UserDocument,
      attributes: ['status', [Sequelize.literal('COUNT(DISTINCT(user_document_id))'), 'documentCount']],
      data: { userId },
      group: ['status'],
      transaction
    })

    if (statusCount.length) {
      let totalCount = 0
      statusCount.forEach(status => {
        totalCount += parseInt(status.dataValues.documentCount)
      })

      const documentLabel = await getAll({
        model: db.DocumentLabel,
        data: { documentLabelId: { [Op.in]: userData.userDetails.documentLabels } },
        attributes: ['name'],
        transaction
      })
      const total = documentLabel.length

      if (total === totalCount) {
        statusValue = STATUS_VALUE.REQUESTED

        for (let index = 0; index < statusCount.length; index++) {
          if (statusCount[index].status === STATUS.REJECTED) {
            statusValue = STATUS_VALUE.REJECTED
            break
          } else if (statusCount[index].status === STATUS.APPROVED) {
            if (parseInt(statusCount[index].dataValues.documentCount) === total) {
              statusValue = STATUS_VALUE.APPROVED
              break
            }
          }
        }
      }
    } else if (statusCount.length === 0 && userData.kycStatus === STATUS_VALUE.RE_REQUESTED) {
      if (userData.userDetails.documentLabels) statusValue = STATUS_VALUE.RE_REQUESTED
      else statusValue = STATUS_VALUE.APPROVED
    }

    await userData.set({ ...data, kycStatus: statusValue }).save({ transaction })

    return { success: true, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}
