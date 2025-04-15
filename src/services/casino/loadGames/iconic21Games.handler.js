import db from '@src/db/models';
import { IconicCasinoAxios } from '@src/libs/axios/iconicCasino.axios';
import { BaseHandler } from '@src/libs/logicBase';
import { CASINO_AGGREGATORS } from '@src/utils/constants/casino.constants';
import { Op } from 'sequelize';

export class LoadIconic21GamesHandler extends BaseHandler {
   /**
    * Ensures the required database entries for aggregator, provider, and category.
    * @param {Object} transaction - The current database transaction.
    * @returns {Object} Required DB IDs for creating casino games.
    */
   async ensureDatabaseEntries(transaction) {
      // Ensure Casino Aggregator
      const casinoAggregator = await db.CasinoAggregator.findOne({
         where: {
            name: {
               [Op.contains]: { EN: CASINO_AGGREGATORS.ICONIC21 },
            },
         },
         transaction
      })
      if (!casinoAggregator) {
         casinoAggregator = await db.CasinoAggregator.create(
            { name: { EN: CASINO_AGGREGATORS.ICONIC21 } },
            { transaction }
         );
      }

      // Ensure Casino Provider
      let casinoProvider = await db.CasinoProvider.findOne({
         where: { name: { EN: CASINO_AGGREGATORS.ICONIC21 } },
      });
      if (!casinoProvider) {
         casinoProvider = await db.CasinoProvider.create(
            { name: { EN: CASINO_AGGREGATORS.ICONIC21 }, gameAggregatorId: casinoAggregator.id },
            { transaction }
         );
      }

      // Ensure Casino Category
      let casinoCategory = await db.CasinoCategory.findOne({
         where: { name: { [Op.contains]: { EN: 'Live' } } },
      });
      if (!casinoCategory) {
         casinoCategory = await db.CasinoCategory.create(
            { name: { EN: 'Live' } },
            { transaction }
         );
      }

      return {
         casinoProviderId: casinoProvider.id,
         casinoCategoryId: casinoCategory.id,
      };
   }

   /**
    * Processes and transforms game data for bulk creation.
    * @param {Array} games - Games fetched from the Iconic Casino API.
    * @param {Object} ids - Required DB IDs for provider and category.
    * @returns {Array} Processed game data for insertion.
    */
   prepareGameData(games, ids) {
      return games.map((game) => ({
         casinoProviderId: ids.casinoProviderId,
         casinoCategoryId: ids.casinoCategoryId,
         casinoGameId: game.launchAlias,
         name: game.names[0]?.tableName || 'Unknown',
         returnToPlayer: game.rtp,
         thumbnailUrl: JSON.stringify(game.images),
         moreDetails: game,
      }));
   }

   /**
    * Main handler to fetch and store games from Iconic Casino.
    */
   async run() {
      const iconicCasinoAPI = new IconicCasinoAxios();
      const transaction = this.dbTransaction;

      try {
         const languages = ['en'];
         const currencies = ['GC', 'SC'];
         const resolutions = ['556_420'];

         // Ensure database entries and get necessary IDs
         const ids = await this.ensureDatabaseEntries(transaction);

         // Fetch games from Iconic Casino API
         const casinoGames = await iconicCasinoAPI.getAvailableTables(languages, currencies, resolutions);
         // Prepare game data for bulk creation
         const casinoGameData = this.prepareGameData(casinoGames.tables, ids);
         // Bulk create or update games in the database
         await db.CasinoGame.bulkCreate(casinoGameData, {
            updateOnDuplicate: ['name', 'thumbnailUrl'],
            logging: true,
            transaction,
         });
         return true
      } catch (error) {
         console.error(`Error loading Iconic21 games: ${error.message}`, error);
         throw new Error(`Error loading Iconic21 games: ${error.message}`);
      }
   }
}
