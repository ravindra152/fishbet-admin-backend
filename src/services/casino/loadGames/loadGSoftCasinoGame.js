
import db from '@src/db/models'
import { GsoftCasinoAxios } from '@src/libs/axios/gsoftCasino.axios'
import { BaseHandler } from '@src/libs/logicBase'
import { CASINO_AGGREGATORS } from '@src/utils/constants/casino.constants'
import { Op } from 'sequelize'

export class LoadGSoftCasinoGameHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const transaction = this.context.sequelizeTransaction
    let casinoAggregator = await db.CasinoAggregator.findOne({
      where: { name: CASINO_AGGREGATORS.GSOFT }
    })
    if (!casinoAggregator) {
      casinoAggregator = await db.CasinoAggregator.create({
        name: { EN: CASINO_AGGREGATORS.GSOFT }
      }, { transaction })
    }

    const casinoAPI = new GsoftCasinoAxios()
    const casinoGames = await casinoAPI.getCasinoGames()
    const casinoGameData = []
    for (const game of casinoGames) {
      let casinoProvider = await db.CasinoProvider.findOne({
        where: {
          name: {
            [Op.contains]: { EN: game.subVendorName }
          }
        },
        transaction
      })
      if (!casinoProvider) {
        casinoProvider = await db.CasinoProvider.create({
          name: { EN: game.subVendorName },
          gameAggregatorId: casinoAggregator.id
        }, { transaction })
      }

      let casinoCategory = await db.CasinoCategory.findOne({
        where: {
          name: {
            [Op.contains]: { EN: game.gameCategory }
          }
        },
        transaction
      })
      if (!casinoCategory) {
        casinoCategory = await db.CasinoCategory.create({
          name: { EN: game.gameCategory }
        }, { transaction })
      }

      casinoGameData.push({
        casinoProviderId: casinoProvider.id,
        casinoCategoryId: casinoCategory.id,
        casinoGameId: game.gameId,
        name: game.gameName,
        returnToPlayer: game.defaultRtp,
        wageringContribution: 0,
        hasFreespins: game.supportFrb === 'Yes',
        thumbnailUrl: { url: game.defaultImg },
        devices: game.platforms,
        demo: game?.demo || false,
        moreDetails: game
      })
    }

    await db.CasinoGame.bulkCreate(casinoGameData, {
      updateOnDuplicate: ['name', 'thumbnailUrl'],
      logging: true,
      transaction
    })

    return { success: true }
  }
}
