import { isAdminAuthenticated } from '@src/rest-resources/middlewares'

import contextMiddleware from '@src/rest-resources/middlewares/context.middleware'
import express from 'express'

import { requestValidationMiddleware } from '@src/rest-resources/middlewares/requestValidation.middleware'
import { APPLICATION_MODULES, PERMISSION_LEVELS } from '@src/utils/constants/staffManagement.constants'
// import { getSpinWheelListSchema } from 'dist/src/json-schemas/spinWheel/getSpinWheelList.schema'
// import { updateSpinWheelListSchema } from 'dist/src/json-schemas/spinWheel/updateSpinWheelList.schema'
import { uploadSingle } from '@src/rest-resources/middlewares/multer'
// import { addVipTierSchema } from 'dist/src/json-schemas/vipTier/addVipTier'
// import { getVipTiersSchema } from 'dist/src/json-schemas/vipTier/getVipTiers'
// import { updateVipTierSchema } from 'dist/src/json-schemas/vipTier/updateVipTier'
import UserEngagementController from '@src/rest-resources/controllers/userEngagement.controller'
import { getSpinWheelListSchema } from '@src/json-schemas/spinWheel/getSpinWheelList.schema'
import { updateSpinWheelListSchema } from '@src/json-schemas/spinWheel/updateSpinWheelList.schema'
import { updateVipTierSchema } from '@src/json-schemas/vipTier/updateVipTier'
import { addVipTierSchema } from '@src/json-schemas/vipTier/addVipTier'
import { getVipTiersSchema } from '@src/json-schemas/vipTier/getVipTiers'

const args = { mergeParams: true }
const userEngagementRouter = express.Router(args)

userEngagementRouter.route('/spin-wheel-configuration')
  .get(contextMiddleware(false), requestValidationMiddleware(getSpinWheelListSchema), isAdminAuthenticated(), UserEngagementController.getSpinWheelList,)
  .put(requestValidationMiddleware(updateSpinWheelListSchema), contextMiddleware(true), isAdminAuthenticated(), UserEngagementController.updateSpinWheel,)

userEngagementRouter.route('/vip-tiers')
  .get(contextMiddleware(false), isAdminAuthenticated(APPLICATION_MODULES.PLAYER_ENGAGEMENT, PERMISSION_LEVELS.Read), requestValidationMiddleware(getVipTiersSchema), UserEngagementController.getVipTiers)
  .post(contextMiddleware(true), uploadSingle('icon'), isAdminAuthenticated(APPLICATION_MODULES.PLAYER_ENGAGEMENT, PERMISSION_LEVELS.Create), requestValidationMiddleware(addVipTierSchema), UserEngagementController.addVipTier)
  .put(contextMiddleware(true), uploadSingle('icon'), isAdminAuthenticated(APPLICATION_MODULES.PLAYER_ENGAGEMENT, PERMISSION_LEVELS.Update), requestValidationMiddleware(updateVipTierSchema), UserEngagementController.updateVipTier)

export { userEngagementRouter }
