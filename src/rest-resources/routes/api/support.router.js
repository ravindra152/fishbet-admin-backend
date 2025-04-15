import { isAdminAuthenticated } from '@src/rest-resources/middlewares'
import contextMiddleware from '@src/rest-resources/middlewares/context.middleware'
import express from 'express'
import { requestValidationMiddleware } from '@src/rest-resources/middlewares/requestValidation.middleware'
import SupportController from '@src/rest-resources/controllers/support.controller'


const args = { mergeParams: true }
const supportRouter = express.Router(args)


supportRouter.route('/tickets')
  .get(contextMiddleware(false), requestValidationMiddleware({}), isAdminAuthenticated(),  SupportController.getTickets)
  .put(contextMiddleware(true), requestValidationMiddleware({}), isAdminAuthenticated(),  SupportController.updateTicketStatus)


supportRouter.route('/ticket-message')
  .get(contextMiddleware(false), requestValidationMiddleware({}), isAdminAuthenticated(),  SupportController.getTicketMessages)
  .post(contextMiddleware(true), requestValidationMiddleware({}), isAdminAuthenticated(),  SupportController.sendTicketMessage)


export { supportRouter }
