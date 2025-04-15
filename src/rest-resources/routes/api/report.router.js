import { getCasinoTransactionsSchema } from '@src/json-schemas/report/getCasinoTransactions.schema'
import { getGameReportSchema } from '@src/json-schemas/report/getGameReport.schema'
import { getTopPlayerSchema } from '@src/json-schemas/report/getTopPlayer.schema'
import { getTransactionsSchema } from '@src/json-schemas/report/getTransactions.schema'
import ReportController from '@src/rest-resources/controllers/report.controller'
import { isAdminAuthenticated } from '@src/rest-resources/middlewares'
import contextMiddleware from '@src/rest-resources/middlewares/context.middleware'
import { requestValidationMiddleware } from '@src/rest-resources/middlewares/requestValidation.middleware'
import express from 'express'

const args = { mergeParams: true }
const reportRouter = express.Router(args)



reportRouter.route('/stats').get(contextMiddleware(false), ReportController.getStatsReport)

reportRouter.route('/top-players').get(contextMiddleware(false), requestValidationMiddleware(getTopPlayerSchema), ReportController.getTopTen)
reportRouter.route('/game').get(
   contextMiddleware(false),
   requestValidationMiddleware(getGameReportSchema),
   // isAdminAuthenticated(),
   ReportController.getGameReport
)

reportRouter.route('/transactions').get(contextMiddleware(false), requestValidationMiddleware(getTransactionsSchema), ReportController.getTransactions)
reportRouter.route('/casino-transactions').get(contextMiddleware(false), requestValidationMiddleware(getCasinoTransactionsSchema), ReportController.getCasinoTransactions)


export { reportRouter }
