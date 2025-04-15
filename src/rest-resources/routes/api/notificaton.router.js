import contextMiddleware from '@src/rest-resources/middlewares/context.middleware'
import { isAdminAuthenticated } from '@src/rest-resources/middlewares'
import { requestValidationMiddleware } from '@src/rest-resources/middlewares/requestValidation.middleware'
import AdminController from '@src/rest-resources/controllers/admin.controller'
import { responseValidationMiddleware } from '@src/rest-resources/middlewares/responseValidation.middleware'
import { createNotificationSchema } from '@src/json-schemas/notification/createNotification.schema'
import { getNotificationSchema } from '@src/json-schemas/notification/getNotification.schema'
import express from 'express'

const args = { mergeParams: true }
const notificationRouter = express.Router(args)
notificationRouter.route('/')
    .post(contextMiddleware(false), isAdminAuthenticated(), requestValidationMiddleware(createNotificationSchema),  AdminController.createNotification, responseValidationMiddleware(createNotificationSchema))
    .get(contextMiddleware(false), isAdminAuthenticated(), requestValidationMiddleware(getNotificationSchema),  AdminController.getNotification)
export { notificationRouter }

