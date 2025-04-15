import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import { Op } from 'sequelize'
import db from '@src/db/models'
import { getOne } from '@src/services/helper/crud'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'
import { pageValidation, filterByName } from '@src/utils/common'

const schema = {
  type: 'object',
  properties: {
    bonusId: { type: 'string' },
    limit: { type: ['string', 'null'] },
    pageNo: { type: ['string', 'null'] },
    search: { type: ['string', 'null'] },
    providerId: { type: ['string', 'null'] }
  },
  required: ['bonusId']
}



export class GetFreespinGamesHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { bonusId, limit, pageNo, providerId, search } = this.args
    let query

    const { page, size } = pageValidation(pageNo, limit)

    if (search) query = filterByName(query, search)
    if (providerId) query = { ...query, masterCasinoProviderId: providerId }

    const gameList = await getOne({ model: db.Bonus, data: { bonusId }, attributes: ['gameIds'] })
    if (!gameList) throw new AppError(Errors.BONUS_NOT_FOUND)

    query = { ...query, masterCasinoGameId: { [Op.in]: gameList.gameIds } }
    const gameWithFreespin = await db.MasterCasinoGame.findAndCountAll({
      where: query,
      order: [['createdAt', 'DESC']],
      limit: size,
      offset: ((page - 1) * size)
    })

    if (!gameWithFreespin) throw new AppError(Errors.GAME_NOT_FOUND)

    return { gameWithFreespin, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
