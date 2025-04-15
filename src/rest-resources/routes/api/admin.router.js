// import { createAdminUsersSchema } from '@src/json-schemas/admin/createAdminUser.schema'
import { createAdminUserSchema } from '@src/json-schemas/admin/createAdminUser.schema'
import { getAdminChildsSchema } from '@src/json-schemas/admin/getAdminChilds.schema'
import { getAdminUserDetailsSchema } from '@src/json-schemas/admin/getAdminUserDetails.schema'
import { getAdminUsersSchema } from '@src/json-schemas/admin/getAdminUsers.schema'
import { updateAdminProfileSchema } from '@src/json-schemas/admin/updateAdminProfile.schema'
import { updateAdminUserSchema } from '@src/json-schemas/admin/updateAdminUser.schema'
import { updateSiteInfoSchema } from '@src/json-schemas/admin/updateSiteInfo.schema'
import { updateStatusSchema } from '@src/json-schemas/admin/updateStatus.schema'
import AdminController from '@src/rest-resources/controllers/admin.controller'
import { isAdminAuthenticated } from '@src/rest-resources/middlewares'
import contextMiddleware from '@src/rest-resources/middlewares/context.middleware'
import { uploadSingle } from '@src/rest-resources/middlewares/multer'
import { requestValidationMiddleware } from '@src/rest-resources/middlewares/requestValidation.middleware'
import { APPLICATION_MODULES, PERMISSION_LEVELS } from '@src/utils/constants/staffManagement.constants'
import express from 'express'

const args = { mergeParams: true }
const adminRouter = express.Router(args)

adminRouter.route('/login').post(AdminController.adminLogin)
adminRouter.route('/childs').get(contextMiddleware(false), isAdminAuthenticated(APPLICATION_MODULES.ADMINISTRATOR, PERMISSION_LEVELS.Read), requestValidationMiddleware(getAdminChildsSchema), AdminController.getAdminChilds)
adminRouter.route('/profile').put(contextMiddleware(true), requestValidationMiddleware(updateAdminProfileSchema), isAdminAuthenticated(), AdminController.updateAdminProfile)
adminRouter.route('/roles').get(contextMiddleware(false), isAdminAuthenticated(), AdminController.getAdminRoles)

adminRouter.route('/')
  .post(contextMiddleware(true), isAdminAuthenticated(APPLICATION_MODULES.ADMINISTRATOR, PERMISSION_LEVELS.Create), requestValidationMiddleware(createAdminUserSchema), AdminController.createAdminUser)
  .put(contextMiddleware(true), isAdminAuthenticated(APPLICATION_MODULES.ADMINISTRATOR, PERMISSION_LEVELS.Update), requestValidationMiddleware(updateAdminUserSchema), AdminController.updateAdminUser)
  .get(contextMiddleware(false), isAdminAuthenticated(APPLICATION_MODULES.ADMINISTRATOR, PERMISSION_LEVELS.Read), requestValidationMiddleware(getAdminUsersSchema), AdminController.getAdminUsers)

adminRouter.route('/toggle').put(contextMiddleware(false), isAdminAuthenticated(), requestValidationMiddleware(updateStatusSchema), isAdminAuthenticated(), AdminController.updateStatus)

// adminRouter.route('/add-balance').put(contextMiddleware(true), requestValidationMiddleware(addBalanceSchema), isAdminAuthenticated(), WalletController.addBalance)

// adminRouter.route('/forget-password').put(contextMiddleware(false), AdminController.forgetPassword)

// adminRouter.route('/verify-forget-password').put(contextMiddleware(false), AdminController.verifyForgetPassword)
adminRouter.route('/change-password').put(contextMiddleware(true), isAdminAuthenticated(), AdminController.changePassword)
adminRouter.route('/transactions').put(contextMiddleware(false), requestValidationMiddleware({}), isAdminAuthenticated(), AdminController.getTransactions)


adminRouter.route('/details').get(contextMiddleware(false), isAdminAuthenticated(APPLICATION_MODULES.ADMINISTRATOR, PERMISSION_LEVELS.Read), requestValidationMiddleware(getAdminUserDetailsSchema), AdminController.getAdminUserDetails)
// adminRouter.route('/all-group').get(contextMiddleware(false), isAdminAuthenticated(), AdminController.getAllGroup)
adminRouter.route('/site-information')
  .put(contextMiddleware(false), uploadSingle('logo'), requestValidationMiddleware(updateSiteInfoSchema), isAdminAuthenticated(), AdminController.updateSiteInfo)
  .get(contextMiddleware(false), isAdminAuthenticated(), AdminController.getSiteInfo)

export { adminRouter }
