import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'

const schema = {
  type: 'object',
  properties: {
    order: { type: 'array' }
  },
  required: ['order']
}



export class OrderGameCategoryHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run() {
    const categoryIds = [...(new Set(this.args.order))]

    await Promise.all(categoryIds.map(async (categoryId, index) => {
      await db.CasinoCategory.update({ orderId: index + 1 }, { where: { id: categoryId } })
    }))
    return { success: true, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}
