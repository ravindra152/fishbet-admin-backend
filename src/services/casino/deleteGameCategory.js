import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import { getOne } from '@src/services/helper/crud'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'

const schema = {
  type: 'object',
  properties: {
    gameCategoryId: { type: 'number' }
  },
  required: ['gameCategoryId']
}



export class DeleteGameCategoryHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const { gameCategoryId } = this.args
    const transaction = this.context.sequelizeTransaction
    const checkCategoryGameExists = await db.CasinoCategory.findOne({
      where: { id: gameCategoryId },
      transaction
    })

    if (!checkCategoryGameExists) throw new AppError(Errors.GAME_CATEGORY_NOT_FOUND)

    await checkCategoryGameExists.destroy({ transaction })

    return { success: true, message: SUCCESS_MSG.DELETE_SUCCESS }
  }
}
