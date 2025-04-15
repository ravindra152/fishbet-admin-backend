import AdminRoleController from '@src/rest-resources/controllers/adminRole.controller'
import { isAdminAuthenticated } from '@src/rest-resources/middlewares'
import contextMiddleware from '@src/rest-resources/middlewares/context.middleware'
import express from 'express'

import { createAdminRoleSchema } from '@src/json-schemas/adminRole/createAdminRole.schema'
import { deleteAdminRoleSchema } from '@src/json-schemas/adminRole/deleteAdminRole.schama'
import { getAdminRoleSchema } from '@src/json-schemas/adminRole/getAdminRole.schema'
import { getAllAdminRolesSchema } from '@src/json-schemas/adminRole/getAllAdminRole.schema'
import { updateAdminRoleSchema } from '@src/json-schemas/adminRole/updateAdminRole.schema'
import { requestValidationMiddleware } from '@src/rest-resources/middlewares/requestValidation.middleware'


const args = { mergeParams: true }
const adminRoleRouter = express.Router(args)

adminRoleRouter.route('/')
  .post(contextMiddleware(true), requestValidationMiddleware(createAdminRoleSchema), isAdminAuthenticated(), AdminRoleController.createAdminRole)
  .put(contextMiddleware(true), requestValidationMiddleware(updateAdminRoleSchema), isAdminAuthenticated(), AdminRoleController.updateAdminRole)
  .delete(contextMiddleware(true), requestValidationMiddleware(deleteAdminRoleSchema), isAdminAuthenticated(), AdminRoleController.deleteAdminRole)
  .get(contextMiddleware(false), requestValidationMiddleware(getAdminRoleSchema), isAdminAuthenticated(), AdminRoleController.getAdminRole)

adminRoleRouter.route('/all').get(contextMiddleware(false), requestValidationMiddleware({ getAllAdminRolesSchema }), isAdminAuthenticated(), AdminRoleController.getAllAdminRoles)

export { adminRoleRouter }
