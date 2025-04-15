import { createCmsPageSchema } from '@src/json-schemas/cms/createCmsPage.schema'
import { deleteCmsPageLanguageSchema } from '@src/json-schemas/cms/deleteCmsPageLanguage.schema'
import { getAllCmsPageSchema } from '@src/json-schemas/cms/getAllCmsPage.schema'
import { getCmsPageSchema } from '@src/json-schemas/cms/getCmsPage.schema'
import { toggleCmsIsActiveSchema } from '@src/json-schemas/cms/toggleCmsIsActive.schema'
import { updateCmsPageSchema } from '@src/json-schemas/cms/updateCmsPage.schema'
import { createNotificationSchema } from '@src/json-schemas/notification/createNotification.schema'
import { getNotificationSchema } from '@src/json-schemas/notification/getNotification.schema'
import CmsController from '@src/rest-resources/controllers/cms.controller'
import { isAdminAuthenticated } from '@src/rest-resources/middlewares'
import contextMiddleware from '@src/rest-resources/middlewares/context.middleware'
import { requestValidationMiddleware } from '@src/rest-resources/middlewares/requestValidation.middleware'
import { responseValidationMiddleware } from '@src/rest-resources/middlewares/responseValidation.middleware'
import express from 'express'

const args = { mergeParams: true }
const cmsRouter = express.Router(args)

cmsRouter.route('/details').get(contextMiddleware(false), requestValidationMiddleware(getCmsPageSchema), isAdminAuthenticated(), CmsController.getCmsPage)

cmsRouter.route('/')
  .get(contextMiddleware(false), requestValidationMiddleware(getAllCmsPageSchema), isAdminAuthenticated(), CmsController.getAllCmsPage)
  .post(contextMiddleware(true), requestValidationMiddleware(createCmsPageSchema), isAdminAuthenticated(), CmsController.createCmsPage)
  .put(contextMiddleware(true), requestValidationMiddleware(updateCmsPageSchema), isAdminAuthenticated(), CmsController.updateCmsPage)
  .delete(contextMiddleware(true), requestValidationMiddleware(deleteCmsPageLanguageSchema), isAdminAuthenticated(), CmsController.deleteCmsPageLanguage)

cmsRouter.route('/dynamic-data').get(contextMiddleware(false), isAdminAuthenticated(), CmsController.getCmsDynamicData)

cmsRouter.route('/language').get(contextMiddleware(false), isAdminAuthenticated(), CmsController.getLanguages)

cmsRouter.route('/toggle').put(contextMiddleware(true), requestValidationMiddleware(toggleCmsIsActiveSchema), isAdminAuthenticated(), CmsController.toggleCms)

cmsRouter.route('/notice')
  .post(contextMiddleware(true), isAdminAuthenticated(), requestValidationMiddleware(createNotificationSchema), CmsController.createNotification, responseValidationMiddleware(createNotificationSchema))
  .get(contextMiddleware(false), isAdminAuthenticated(), requestValidationMiddleware(getNotificationSchema), CmsController.getNotification)

export { cmsRouter }
