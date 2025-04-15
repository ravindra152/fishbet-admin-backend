import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import { Op } from 'sequelize'
import db from '@src/db/models'
import { getOne } from '@src/services/helper/crud'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'

const schema = {
  type: 'object',
  properties: {
    casinoGameId: { type: 'number' }
  },
  required: ['casinoGameId']
}



export class DeleteCategoryGameHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { casinoGameId } = this.args
    const transaction = this.context.sequelizeTransaction

    const checkCategoryGameExists = await getOne({ model: db.CasinoGame, data: { casinoGameId, parentId: { [Op.ne]: null } }, transaction })
    if (!checkCategoryGameExists) throw new AppError(Errors.CATEGORY_GAME_NOT_FOUND)

    await checkCategoryGameExists.destroy({ transaction })

    return { success: true, message: SUCCESS_MSG.DELETE_SUCCESS }
  }
}
