import express from 'express'

import { requestValidationMiddleware } from '@src/rest-resources/middlewares/requestValidation.middleware'
import { responseValidationMiddleware } from '@src/rest-resources/middlewares/responseValidation.middleware'
import { adminRouter } from './admin.router'
import { adminRoleRouter } from './adminRole.router'
import { bannerRouter } from './banner.router'
import { bonusRouter } from './bonus.router'
import { casinoRouter } from './casino.router'
import { cmsRouter } from './cms.router'
import { emailRouter } from './email.router'
import { galleryRouter } from './gallery.router'
import { liveChatRouter } from './liveChat.router'
import { packageRouter } from './package.router'
import { reportRouter } from './report.router'
import { supportRouter } from './support.router'
import { userRouter } from './user.router'
import { userEngagementRouter } from './userEngagement.router'
import { walletRouter } from './wallet.router'
import { settingsRouter } from './settings.router'

const superRouter = express.Router()

superRouter.use('/casino', requestValidationMiddleware({}), casinoRouter, responseValidationMiddleware({}))
superRouter.use('/banner', requestValidationMiddleware({}), bannerRouter, responseValidationMiddleware({}))
superRouter.use('/cms', requestValidationMiddleware({}), cmsRouter, responseValidationMiddleware({}))
superRouter.use('/email', requestValidationMiddleware({}), emailRouter, responseValidationMiddleware({}))
superRouter.use('/gallery', requestValidationMiddleware({}), galleryRouter, responseValidationMiddleware({}))
superRouter.use('/reports', requestValidationMiddleware({}), reportRouter, responseValidationMiddleware({}))
superRouter.use('/user', requestValidationMiddleware({}), userRouter, responseValidationMiddleware({}))
superRouter.use('/bonus', requestValidationMiddleware({}), bonusRouter, responseValidationMiddleware({}))
superRouter.use('/admin-role', requestValidationMiddleware({}), adminRoleRouter, responseValidationMiddleware({}))
superRouter.use('/package', requestValidationMiddleware({}), packageRouter, responseValidationMiddleware({}))
superRouter.use('/wallet', requestValidationMiddleware({}), walletRouter, responseValidationMiddleware({}))
superRouter.use('/user-engagement', requestValidationMiddleware({}), userEngagementRouter, responseValidationMiddleware({}))
superRouter.use('/support', requestValidationMiddleware({}), supportRouter, responseValidationMiddleware({}))
superRouter.use('/admin', requestValidationMiddleware({}), adminRouter, responseValidationMiddleware({}))
superRouter.use('/live-chat', requestValidationMiddleware({}), liveChatRouter, responseValidationMiddleware({}))
superRouter.use('/settings', requestValidationMiddleware({}), settingsRouter, responseValidationMiddleware({}))

export default superRouter
