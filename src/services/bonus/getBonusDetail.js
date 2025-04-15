import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'

export class GetBonusDetailHandler extends BaseHandler {
  async run() {
    const bonusDetails = await db.Bonus.findOne({
      where: { id: this.args.bonusId },
    })

    if (!bonusDetails) throw new AppError(Errors.BONUS_NOT_FOUND)

    let eligibleGames = []

    if (bonusDetails.eligibleGames && bonusDetails.eligibleGames.length > 0) {
      eligibleGames = await db.CasinoGame.findAll({
        where: {
          id: {
            [db.Sequelize.Op.in]: bonusDetails.eligibleGames
          }
        },
        attributes: ['id', 'name', 'thumbnailUrl']
      })
    }

    return {
      bonusDetails: {
        ...bonusDetails.toJSON(),
        eligibleGames: eligibleGames.map(game => ({
          id: game.id,
          name: game.name,
          thumbnailUrl: game.thumbnailUrl
        }))
      },
      message: SUCCESS_MSG.GET_SUCCESS
    }
  }
}
