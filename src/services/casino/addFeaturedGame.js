import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { getOne } from '@src/services/helper/crud'
import { SUCCESS_MSG } from '@src/utils/success'

const schema = {
  type: 'object',
  properties: {
    casinoGameId: { type: 'string' },
    isFeatured: { type: 'boolean' }
  },
  required: ['casinoGameId', 'isFeatured']
}



export class addFeaturedGameHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run() {
    const { casinoGameId, isFeatured } = this.args

    const casinoGame = await getOne({ model: db.CasinoGame, data: { casinoGameId: casinoGameId } })
    if (!casinoGame) throw new AppError(Errors.NOT_FOUND_CASINO_GAME)
    casinoGame.isFeatured = isFeatured
    await casinoGame.save()
    return { success: true, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}
