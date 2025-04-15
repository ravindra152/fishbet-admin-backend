import { deleteImageSchema } from '@src/json-schemas/gallery/deleteImage.schema'
import { uploadImageGallerySchema } from '@src/json-schemas/gallery/uploadImageGallery.schema'
import EmailTemplateController from '@src/rest-resources/controllers/email.controller'
import { isAdminAuthenticated } from '@src/rest-resources/middlewares'
import contextMiddleware from '@src/rest-resources/middlewares/context.middleware'
import { uploadSingle } from '@src/rest-resources/middlewares/multer'
import { requestValidationMiddleware } from '@src/rest-resources/middlewares/requestValidation.middleware'
import express from 'express'

const args = { mergeParams: true }
const galleryRouter = express.Router(args)

galleryRouter.route('/')
  .get(contextMiddleware(false), isAdminAuthenticated(), EmailTemplateController.getGallery)
  .put(contextMiddleware(true), requestValidationMiddleware(uploadImageGallerySchema), uploadSingle('image'), EmailTemplateController.uploadImageGallery)
  .delete(contextMiddleware(true), requestValidationMiddleware(deleteImageSchema), isAdminAuthenticated(), EmailTemplateController.deleteImage)

export { galleryRouter }
