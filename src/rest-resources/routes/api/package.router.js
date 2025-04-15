import { createPackageSchema } from '@src/json-schemas/packages/createPackage.schema';
import PackageController from '@src/rest-resources/controllers/package.controller';
import { isAdminAuthenticated } from '@src/rest-resources/middlewares';
import contextMiddleware from '@src/rest-resources/middlewares/context.middleware';
import { uploadSingle } from '@src/rest-resources/middlewares/multer';
import { requestValidationMiddleware } from '@src/rest-resources/middlewares/requestValidation.middleware';
import express from 'express';

const args = { mergeParams: true };
const packageRouter = express.Router(args);

packageRouter.route('/')
  .post(contextMiddleware(true), uploadSingle('file'), requestValidationMiddleware(createPackageSchema), PackageController.createPackage)
  .put(contextMiddleware(true), uploadSingle('file'), PackageController.updatePackage)
  .delete(contextMiddleware(true), PackageController.deletePackage)
  .get(isAdminAuthenticated(), contextMiddleware(false), PackageController.getPackage)

packageRouter.route('/all').get(contextMiddleware(false), PackageController.getAllPackages)

export { packageRouter };
