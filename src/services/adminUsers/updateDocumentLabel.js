import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'
import { getOne, updateEntity } from '@src/services/helper/crud'

const schema = {
  type: 'object',
  properties: {
    documentLabelId: { type: 'number' },
    name: { type: ['object', 'null'] },
    isRequired: { type: ['boolean', 'null'] }
  },
  required: ['documentLabelId']
}



export class UpdateDocumentLabelHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { documentLabelId, name, isRequired } = this.args

    const checkLabelExists = await getOne({
      model: db.DocumentLabel,
      data: { documentLabelId }
    })

    if (!checkLabelExists) throw new AppError(Errors.DOCUMENT_LABELS_NOT_FOUND)

    const updatedLabel = await updateEntity({
      model: db.DocumentLabel,
      values: { documentLabelId },
      data: { name: { ...checkLabelExists.name, ...name }, isRequired }
    })

    return { updatedLabel, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}
