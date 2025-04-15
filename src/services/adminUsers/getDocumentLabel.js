import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import { Op } from 'sequelize'

import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { getAll, getOne } from '@src/services/helper/crud'
import { STATUS_VALUE } from '@src/utils/constant'
import { SUCCESS_MSG } from '@src/utils/success'

const schema = {
  type: 'object',
  properties: {
    userId: { type: ['string', 'null'] }
  }
}



export class GetDocumentLabelHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    let query
    const { userId } = this.args

    if (userId) {
      const userExist = await getOne({
        model: db.User,
        data: { userId },
        attributes: ['userId', 'kycStatus', 'kycMethod', 'applicantId'],
        include: [
          {
            model: db.UserDetails,
            as: 'userDetails',
            attributes: ['documentLabels']
          }
        ]
      })

      if (userExist.userDetails.documentLabels) {
        if (userExist.kycStatus === STATUS_VALUE.PENDING) query = { isRequired: false }
        query = { ...query, documentLabelId: { [Op.notIn]: userExist.userDetails.documentLabels } }
      } else query = { isRequired: false }
    }

    const documentLabel = await getAll({
      model: db.DocumentLabel,
      data: query,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      order: [['documentLabelId', 'ASC']]
    })

    if (!documentLabel) throw new AppError(Errors.DOCUMENT_LABELS_NOT_FOUND)

    return { documentLabel, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
