import { addFeaturedGamesSchema } from '@src/json-schemas/casino/addFeaturedGames.schema'
import { createCategoryGameSchema } from '@src/json-schemas/casino/createCategoryGame.schema'
import { createGameCategorySchema } from '@src/json-schemas/casino/createGameCategory.schema'
import { deleteCategoryGameSchema } from '@src/json-schemas/casino/deleteCategoryGame.schema'
import { deleteGameCategorySchema } from '@src/json-schemas/casino/deleteGameCategory.schema'
import { getAggregatorsSchema } from '@src/json-schemas/casino/getAggregators-schema'
import { GetAllGameCategorySchema } from '@src/json-schemas/casino/getAllGameCategory.schema'
import { getAllProvidersSchema } from '@src/json-schemas/casino/getAllProviders.schema'
import { getCasinoGamesSchema } from '@src/json-schemas/casino/getCasinoGames.schema'
import { orderCasinoGamesSchema } from '@src/json-schemas/casino/orderCasinoGames.schema'
import { orderGameCategorySchema } from '@src/json-schemas/casino/orderGameCategory.schema'
import { updateCasinoGameSchema } from '@src/json-schemas/casino/updateCasinoGame.schema'
import { updateGameCategorySchema } from '@src/json-schemas/casino/updateGameCategory.schema'
import { getCasinoTransactionsSchema } from '@src/json-schemas/report/getCasinoTransactions.schema'
import CasinoController from '@src/rest-resources/controllers/casino.controller'
import { isAdminAuthenticated } from '@src/rest-resources/middlewares'
import contextMiddleware from '@src/rest-resources/middlewares/context.middleware'
import { uploadWebAndMobile } from '@src/rest-resources/middlewares/multer'
import { requestValidationMiddleware } from '@src/rest-resources/middlewares/requestValidation.middleware'
import express from 'express'

const args = { mergeParams: true }
const casinoRouter = express.Router(args)

// GET
casinoRouter.route('/aggregators').get(contextMiddleware(false), requestValidationMiddleware(getAggregatorsSchema), CasinoController.getAggregators)
casinoRouter.route('/providers').get(contextMiddleware(false), requestValidationMiddleware(getAllProvidersSchema), CasinoController.getAllProviders)
casinoRouter.route('/categories').get(contextMiddleware(false), requestValidationMiddleware(GetAllGameCategorySchema), CasinoController.getGameCategory)
// casinoRouter.route('/freespin-games').get(contextMiddleware(false), requestValidationMiddleware(getFreespinGamesSchema), CasinoController.getFreespinGames)
casinoRouter.route('/games').get(contextMiddleware(false), requestValidationMiddleware(getCasinoGamesSchema), CasinoController.getCasinoGame)
casinoRouter.route('/transactions').get(contextMiddleware(false), requestValidationMiddleware(getCasinoTransactionsSchema), CasinoController.getCasinoTransactions)

// PUT & POST
casinoRouter.route('/provider').put(contextMiddleware(true), uploadWebAndMobile, requestValidationMiddleware({}), CasinoController.updateCasinoProvider)
casinoRouter.route('/category').put(contextMiddleware(true), uploadWebAndMobile, requestValidationMiddleware(updateGameCategorySchema), CasinoController.updateGameCategory)
casinoRouter.route('/game').put(contextMiddleware(true), uploadWebAndMobile, requestValidationMiddleware(updateCasinoGameSchema), CasinoController.updateCasinoGame)
casinoRouter.route('/toggle/game').put(contextMiddleware(true), requestValidationMiddleware({}), CasinoController.toggleCasinoGame)
casinoRouter.route('/category').post(contextMiddleware(true), uploadWebAndMobile, requestValidationMiddleware(createGameCategorySchema), CasinoController.createGameCategory)
casinoRouter.route('/order-category').put(contextMiddleware(false), requestValidationMiddleware(orderGameCategorySchema), CasinoController.orderGameCategory)
casinoRouter.route('/order-casino-games').put(contextMiddleware(false), requestValidationMiddleware(orderCasinoGamesSchema), CasinoController.orderCasinoGames)
casinoRouter.route('/category-games').post(contextMiddleware(true), requestValidationMiddleware(createCategoryGameSchema), CasinoController.createCategoryGame)
casinoRouter.route('/featured-games').post(contextMiddleware(false), requestValidationMiddleware(addFeaturedGamesSchema), CasinoController.addFeaturedGames)
casinoRouter.route('/toggle/provider').put(contextMiddleware(true), requestValidationMiddleware({}), CasinoController.toggleCasinoProvider)
casinoRouter.route('/toggle/category').put(contextMiddleware(true), requestValidationMiddleware({}), CasinoController.toggleCasinoCategory)
casinoRouter.route('/toggle/aggregator').put(contextMiddleware(true), requestValidationMiddleware({}), CasinoController.toggleCasinoAggregator)

// DELETE
casinoRouter.route('/category').delete(contextMiddleware(true), requestValidationMiddleware(deleteGameCategorySchema), CasinoController.deleteGameCategory)
casinoRouter.route('/games').delete(contextMiddleware(true), requestValidationMiddleware(deleteCategoryGameSchema), CasinoController.deleteCategoryGame)


// seed games
casinoRouter.route('/alea/load-game').get(contextMiddleware(true), isAdminAuthenticated(), requestValidationMiddleware({}), CasinoController.loadAleaCasinoGame)
casinoRouter.route('/onehubgame/load-game').get(contextMiddleware(true), isAdminAuthenticated(), requestValidationMiddleware({}), CasinoController.loadOneGamehubCasinoGame)


export { casinoRouter }
