import express from 'express'
import contextMiddleware from '@src/rest-resources/middlewares/context.middleware'
import { isAdminAuthenticated } from '@src/rest-resources/middlewares'
import { requestValidationMiddleware } from '@src/rest-resources/middlewares/requestValidation.middleware'
import SettingsController from '@src/rest-resources/controllers/settings.controller'
import { UpdatedWithdrawalLimitsSchema } from '@src/json-schemas/settings/updateWithdrawalLimits.schema'

const args = { mergeParams: true }
const settingsRouter = express.Router(args)


settingsRouter.route('/withdrawal-limits')
  .get(contextMiddleware(false), requestValidationMiddleware({}), isAdminAuthenticated(), SettingsController.getWithdrawalLimits)
  .put(contextMiddleware(true), requestValidationMiddleware(UpdatedWithdrawalLimitsSchema), isAdminAuthenticated(), SettingsController.updateWithdrawalLimits)

settingsRouter.route('/populate-data').get(contextMiddleware(false), requestValidationMiddleware({}),
  SettingsController.populateData)

settingsRouter.route('/currencies').get(contextMiddleware(false), requestValidationMiddleware({}),
  SettingsController.getCurrencies)


export { settingsRouter }
