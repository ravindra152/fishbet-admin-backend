import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import { Op } from 'sequelize'
import ajv from '@src/libs/ajv'
import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'
import { getOne, createNewEntity } from '@src/services/helper/crud'

const schema = {
  type: 'object',
  properties: {
    name: { type: 'object' },
    isRequired: { type: ['boolean', 'null'] }
  },
  required: ['name']
}



export class CreateDocumentLabelHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { name, isRequired } = this.args

    const checkLabelExists = await getOne({
      model: db.DocumentLabel,
      data: { name: { [Op.contains]: { EN: name.EN } } }
    })

    if (checkLabelExists) throw new AppError(Errors.LABEL_ALREADY_EXISTS)

    const label = await createNewEntity({ model: db.DocumentLabel, data: { name, isRequired } })

    return { label, message: SUCCESS_MSG.CREATE_SUCCESS }
  }
}
