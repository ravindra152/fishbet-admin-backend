import { createPromotionsSchema, updatePromotionsSchema } from '@src/json-schemas/banners'
import { deleteBannerSchema } from '@src/json-schemas/banners/deleteBanner.schema'
import { deletePromotionsSchema } from '@src/json-schemas/banners/deletePromotions.schema'
import { getBannerSchema } from '@src/json-schemas/banners/getBanner.schema'
import { getPromotionSchema } from '@src/json-schemas/banners/getPromotions.schema'
import { updateBannerSchema } from '@src/json-schemas/banners/updateBanner.schema'
import AdminController from '@src/rest-resources/controllers/admin.controller'
import { isAdminAuthenticated } from '@src/rest-resources/middlewares'
import contextMiddleware from '@src/rest-resources/middlewares/context.middleware'
import { uploadMultiple, uploadSingle, uploadWebAndMobile } from '@src/rest-resources/middlewares/multer'
import { requestValidationMiddleware } from '@src/rest-resources/middlewares/requestValidation.middleware'
import { responseValidationMiddleware } from '@src/rest-resources/middlewares/responseValidation.middleware'
import express from 'express'

const args = { mergeParams: true }
const bannerRouter = express.Router(args)

bannerRouter.route('/keys').get(contextMiddleware(false), isAdminAuthenticated(), AdminController.getBannerKeys)

bannerRouter.route('/banner-download').post(isAdminAuthenticated(), uploadSingle('zipFile'), contextMiddleware(true), AdminController.createBannerDownload)
bannerRouter.route('/banner-download').get(isAdminAuthenticated(), uploadSingle('zipFile'), contextMiddleware(false), AdminController.getBannerDownload)

bannerRouter.route('/')
  .get(contextMiddleware(false), requestValidationMiddleware(getBannerSchema), isAdminAuthenticated(), AdminController.getBanner)
  .post(contextMiddleware(true), uploadWebAndMobile, requestValidationMiddleware({}), isAdminAuthenticated(), AdminController.createBanner)
  .put(contextMiddleware(true), uploadWebAndMobile, requestValidationMiddleware(updateBannerSchema), isAdminAuthenticated(), AdminController.updateBanner)
  .delete(contextMiddleware(false), requestValidationMiddleware(deleteBannerSchema), isAdminAuthenticated(), AdminController.deleteBanner)

bannerRouter.route('/promotions')
  .get(contextMiddleware(false), requestValidationMiddleware(getPromotionSchema), isAdminAuthenticated(), AdminController.getPromotions)
  .post(isAdminAuthenticated(), uploadWebAndMobile, requestValidationMiddleware(createPromotionsSchema), contextMiddleware(true), isAdminAuthenticated(), AdminController.createPromotions, responseValidationMiddleware(createPromotionsSchema))
  .put(contextMiddleware(true), uploadWebAndMobile, isAdminAuthenticated(), requestValidationMiddleware(updatePromotionsSchema), AdminController.updatePromotions, responseValidationMiddleware(updatePromotionsSchema))
  .delete(contextMiddleware(false), requestValidationMiddleware(deletePromotionsSchema), isAdminAuthenticated(), AdminController.deletePromotions)

export { bannerRouter }
