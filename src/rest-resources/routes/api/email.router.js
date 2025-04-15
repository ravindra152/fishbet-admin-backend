import express from 'express'
import contextMiddleware from '@src/rest-resources/middlewares/context.middleware'
import EmailTemplateController from '@src/rest-resources/controllers/email.controller'
import {  isAdminAuthenticated } from '@src/rest-resources/middlewares'
import { requestValidationMiddleware } from '@src/rest-resources/middlewares/requestValidation.middleware'
import { getAllEmailTemplateSchema } from '@src/json-schemas/email/getAllEmailTemplate.schema'
import { updateEmailTemplateSchema } from '@src/json-schemas/email/updateEmailTemplate.schema'
import { createEmailTemplateSchema } from '@src/json-schemas/email/createEmailTemplate.schema'
import { deleteEmailTemplateSchema } from '@src/json-schemas/email/deleteEmailTemplate.schema'
import { testEmailTemplateSchema } from '@src/json-schemas/email/testEmailTemplate.schema'
import { deleteEmailTemplateLanguageSchema } from '@src/json-schemas/email/deleteEmailTemplateLanguage.schema'
import { markEmailPrimarySchema } from '@src/json-schemas/email/markEmailPrimary.schema'

const args = { mergeParams: true }
const emailRouter = express.Router(args)

emailRouter.route('/all').get(contextMiddleware(false), isAdminAuthenticated(), EmailTemplateController.getAllEmailTemplate)

emailRouter.route('/')
  .get(contextMiddleware(false), requestValidationMiddleware(getAllEmailTemplateSchema), isAdminAuthenticated(),  EmailTemplateController.getEmailTemplateById)
  .put(contextMiddleware(true), requestValidationMiddleware(updateEmailTemplateSchema), isAdminAuthenticated(),  EmailTemplateController.updateEmailTemplate)
  .post(contextMiddleware(false), requestValidationMiddleware(createEmailTemplateSchema), isAdminAuthenticated(),  EmailTemplateController.createEmailTemplate)
  .delete(contextMiddleware(true), requestValidationMiddleware(deleteEmailTemplateSchema), isAdminAuthenticated(),  EmailTemplateController.deleteEmailTemplate)
// 
// emailRouter.route('/test').post(contextMiddleware(false), requestValidationMiddleware(testEmailTemplateSchema), isAdminAuthenticated(),  EmailTemplateController.testEmailTemplate)

// emailRouter.route('/dynamic-data').get(contextMiddleware(false), isAdminAuthenticated(), EmailTemplateController.getEmailDynamicData)

// emailRouter.route('/language').delete(contextMiddleware(true), requestValidationMiddleware(deleteEmailTemplateLanguageSchema), isAdminAuthenticated(), EmailTemplateController.deleteEmailTemplateLanguage)

// emailRouter.route('/mark-primary').put(contextMiddleware(false), requestValidationMiddleware(markEmailPrimarySchema), isAdminAuthenticated(),  EmailTemplateController.markEmailPrimary)

export { emailRouter }
