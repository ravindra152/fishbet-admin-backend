import { Op } from 'sequelize'
import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'
import { updateEntity } from '@src/services/helper/crud'

export class UpdateGamesHandler extends BaseHandler {
  async run () {
    await updateEntity({
      model: db.CasinoGame,
      data: { isActive: false },
      values: { moreDetails: { recalled_at: { [Op.lte]: new Date() } } }
    })

    return { success: true, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}
