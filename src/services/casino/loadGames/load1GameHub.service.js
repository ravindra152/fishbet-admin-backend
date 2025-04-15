import db from '@src/db/models'
import { GameHube1CasinoAxios } from '@src/libs/axios/1GameHub.axios'
import { Logger } from '@src/libs/logger'
import { BaseHandler } from '@src/libs/logicBase'
import { CASINO_AGGREGATORS } from '@src/utils/constants/casino.constants'
import { Op } from 'sequelize'

export class LoadOneGameHubHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    try {

      const transaction = this.context.sequelizeTransaction
      let casinoAggregator = await db.CasinoAggregator.findOne({
        where: {
          name: {
            [Op.contains]: { EN: CASINO_AGGREGATORS.ONEGAMEHUB },
          },
        },
        transaction
      })
      if (!casinoAggregator) {
        casinoAggregator = await db.CasinoAggregator.create({
          name: { EN: CASINO_AGGREGATORS.ONEGAMEHUB }
        }, { transaction })
      }
      const casinoAPI = new GameHube1CasinoAxios()

      const casinoGames = await casinoAPI.getCasinoGames()
      //return { success: true, data: casinoGames }
      //return {"status":true}
      const casinoGameData = []
      for (const game of casinoGames) {
        let casinoProvider = await db.CasinoProvider.findOne({
          where: {
            name: {
              [Op.contains]: { EN: game.provider }
            }
          },
          transaction
        })
        if (!casinoProvider) {
          try {
            casinoProvider = await db.CasinoProvider.create({
              name: { EN: game.provider },
              gameAggregatorId: casinoAggregator.id,
              uniqueId: game.brand_id
            }, { transaction })
          } catch (error) {
            Logger.error(error)
          }
        }
        // let casinoCategory = await db.CasinoCategory.findOne({
        //   where: {
        //     name: {
        //       [Op.contains]: { EN: game.categories[0] }
        //     }
        //   },
        //   transaction
        // })
        // const categoryLower = game.categories[0] ? game.categories[0].toLowerCase() : undefined; // Convert the category to lowercase


        const categoryLower = Array.isArray(game.categories) && game.categories.length > 0
  ? game.categories[0].toLowerCase()
  : undefined;


        let casinoCategory = await db.CasinoCategory.findOne({
          where: db.sequelize.where(
            db.sequelize.fn('LOWER', db.sequelize.json('name.EN')),
            categoryLower
          ),
          transaction
        });
        try {

          if (!casinoCategory) {
            casinoCategory = await db.CasinoCategory.create({
              name: { EN: game.categories[0] }
            }, { transaction })
          }
        } catch (error) {
          Logger.error(error)
        }
        casinoGameData.push({
          casinoProviderId: casinoProvider.id,
          casinoCategoryId: casinoCategory.id,
          casinoGameId: game.id,
          name: game.name,
          hasFreespins: game.is_free_rounds_supported,
          thumbnailUrl: game.media.icon,
          demo: game?.is_demo_supported || false,
          moreDetails: game
        })
      }
      console.log("casinoAPI>>3333")
      try {
        await db.CasinoGame.bulkCreate(casinoGameData, {
          updateOnDuplicate: ['name', 'thumbnailUrl'],
          transaction
        });
      } catch (error) {
        console.error("Error occurred while bulk creating CasinoGames:", error);
        return { success: false, data: error }
      }
      return { success: true, data: casinoGames }
    } catch (error) {
      console.log(error)
    }
  }
}
