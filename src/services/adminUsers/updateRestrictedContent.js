import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'
import { deleteEntity, getAll, updateEntity } from '@src/services/helper/crud'

const schema = {
  type: 'object',
  required: ['model', 'values', 'data', 'type']
}



export class UpdateRestrictedContentHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    let result
    const { model, values, data, type, attributes } = this.args

    if (type === 'update') {
      result = await updateEntity({ model: db[model], values: values, data: data })
    } else if (type === 'getAllData') {
      result = await getAll({ model: db[model], data: data, attributes: attributes })
    } else result = await deleteEntity({ model: db[model], values: values })

    return { result, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}
