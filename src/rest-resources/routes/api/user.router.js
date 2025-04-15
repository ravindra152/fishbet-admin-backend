import UserController from '@src/rest-resources/controllers/user.controller'
import { isAdminAuthenticated } from '@src/rest-resources/middlewares'

import { manageWaletSchema } from '@src/json-schemas/admin/manageWallet.schema'
import { addBannerTextSchema } from '@src/json-schemas/user/addBannerText.schema'
import { addCommentSchema } from '@src/json-schemas/user/addComment.schema'
import { addTagsSchema } from '@src/json-schemas/user/addTags.schema'
import { assignGroupSchema } from '@src/json-schemas/user/assignGroup.schema'
import { createGroupSchema } from '@src/json-schemas/user/createGroup.schema'
import { deleteTagsSchema } from '@src/json-schemas/user/deleteTags.schema'
import { getCommentsSchema } from '@src/json-schemas/user/getComments.schema'
import { getDuplicateUsersSchema } from '@src/json-schemas/user/getDuplicateUsers.schema'
import { getGroupsSchema } from '@src/json-schemas/user/getGroups.schema'
import { getReferredUsersSchema } from '@src/json-schemas/user/getReferredUsers.schema' 
import { getUserDocumentSchema } from '@src/json-schemas/user/getUserDocument.schema'
import { getUsersSchema } from '@src/json-schemas/user/getUsers.schema'
import { resetPasswordSchema } from '@src/json-schemas/user/resetPassword.schema'
import { setDepositLimitSchema } from '@src/json-schemas/user/setDepositLimit.schema'
import { setDisableUntilSchema } from '@src/json-schemas/user/setDisableUntil.schema'
import { setTimeLimitSchema } from '@src/json-schemas/user/setTimeLimit.schema'
import { setUserInternalSchema } from '@src/json-schemas/user/setUserInternal.schema'
import { toggleStatusSchema } from '@src/json-schemas/user/toggleUserStatus.schema'
import { updateCommentsStatusSchema } from '@src/json-schemas/user/updateCommentsStatus.schema'
import { updateGroupSchema } from '@src/json-schemas/user/updateGroup.schema'
import { updatePasswordSchema } from '@src/json-schemas/user/updatePassword.schema'
import { updateSelfExclusionSchema } from '@src/json-schemas/user/updateSelfExclusion.schema'
import { updateUserSchema } from '@src/json-schemas/user/updateUser.schema'
import { updateUserLevelSchema } from '@src/json-schemas/user/updateUserLevel.schema'
import { verifyEmailSchema } from '@src/json-schemas/user/verifyEmail.schema'
import AffiliateController from '@src/rest-resources/controllers/affiliate.controller'
import contextMiddleware from '@src/rest-resources/middlewares/context.middleware'
import { requestValidationMiddleware } from '@src/rest-resources/middlewares/requestValidation.middleware'
import { APPLICATION_MODULES, PERMISSION_LEVELS } from '@src/utils/constants/staffManagement.constants'
import express from 'express'

const args = { mergeParams: true }
const userRouter = express.Router(args)


userRouter.route('/all').get(contextMiddleware(false), requestValidationMiddleware(getUsersSchema), isAdminAuthenticated(), UserController.getUsers)

userRouter.route('/')
  .get(contextMiddleware(false), requestValidationMiddleware({}), isAdminAuthenticated(), UserController.getUser)
  .put(contextMiddleware(true), requestValidationMiddleware(updateUserSchema), isAdminAuthenticated(), UserController.updateUser)

userRouter.route('/referred-players').get(contextMiddleware(false), requestValidationMiddleware(getReferredUsersSchema), isAdminAuthenticated(), AffiliateController.getReferredUsers)
userRouter.route('/document').get(contextMiddleware(false), requestValidationMiddleware(getUserDocumentSchema), isAdminAuthenticated(), UserController.getUserDocument)

userRouter.route('/status').put(contextMiddleware(true), requestValidationMiddleware(toggleStatusSchema), isAdminAuthenticated(), UserController.toggleUserStatus)

userRouter.route('/deposit-limit').post(contextMiddleware(false), requestValidationMiddleware(setDepositLimitSchema), isAdminAuthenticated(), UserController.setDepositLimit)

userRouter.route('/disable-until').post(contextMiddleware(false), requestValidationMiddleware(setDisableUntilSchema), isAdminAuthenticated(), UserController.setDisableUntil)

userRouter.route('/session-time').post(contextMiddleware(false), requestValidationMiddleware(setTimeLimitSchema), isAdminAuthenticated(), UserController.setTimeLimit)

userRouter.route('/tags').delete(contextMiddleware(false), requestValidationMiddleware(deleteTagsSchema), isAdminAuthenticated(), UserController.deleteTags)

userRouter.route('/tags').get(contextMiddleware(false), isAdminAuthenticated(), UserController.getTags)

userRouter.route('/tags').put(contextMiddleware(false), requestValidationMiddleware(addTagsSchema), isAdminAuthenticated(), UserController.addTags)

userRouter.route('/internal').put(contextMiddleware(false), requestValidationMiddleware(setUserInternalSchema), isAdminAuthenticated(), UserController.setUserInternal)

userRouter.route('/verify-email').put(contextMiddleware(true), requestValidationMiddleware(verifyEmailSchema), isAdminAuthenticated(), UserController.verifyEmail)

userRouter.route('/update-password').put(contextMiddleware(true), requestValidationMiddleware(updatePasswordSchema), isAdminAuthenticated(), UserController.updatePassword)

userRouter.route('/reset-password').put(contextMiddleware(true), requestValidationMiddleware(resetPasswordSchema), isAdminAuthenticated(), UserController.resetPassword)

userRouter.route('/home-banner').put(contextMiddleware(false), requestValidationMiddleware(addBannerTextSchema), isAdminAuthenticated(), UserController.bannerText)

userRouter.route('/duplicate').get(contextMiddleware(false), requestValidationMiddleware(getDuplicateUsersSchema), isAdminAuthenticated(), UserController.getDuplicateUsers)

userRouter.route('/comment').post(contextMiddleware(false), requestValidationMiddleware(addCommentSchema), isAdminAuthenticated(), UserController.addComment)

userRouter.route('/comments').get(contextMiddleware(false), requestValidationMiddleware(getCommentsSchema), isAdminAuthenticated(), UserController.getComments)

userRouter.route('/comment-status').put(contextMiddleware(false), requestValidationMiddleware(updateCommentsStatusSchema), isAdminAuthenticated(), UserController.updateCommentsStatus)

userRouter.route('/update-user-level').put(contextMiddleware(true), requestValidationMiddleware(updateUserLevelSchema), isAdminAuthenticated(), UserController.updateUserLevel)
userRouter.route('/manage-wallet').post(contextMiddleware(true), isAdminAuthenticated(APPLICATION_MODULES.USERS, PERMISSION_LEVELS.UPDATE), requestValidationMiddleware(manageWaletSchema), UserController.manageWallet)

userRouter.route('/create-group').post(contextMiddleware(true), requestValidationMiddleware(createGroupSchema), isAdminAuthenticated(), UserController.createGroup)
userRouter.route('/update-group').put(contextMiddleware(true), requestValidationMiddleware(updateGroupSchema), isAdminAuthenticated(), UserController.updateGroup)
userRouter.route('/groups').get(contextMiddleware(false), requestValidationMiddleware(getGroupsSchema), isAdminAuthenticated(), UserController.getGroups)
userRouter.route('/assign-group').post(contextMiddleware(true), requestValidationMiddleware(assignGroupSchema), isAdminAuthenticated(), UserController.assignGroup)

userRouter.route('/self-exclusion').put(contextMiddleware(true), requestValidationMiddleware(updateSelfExclusionSchema), isAdminAuthenticated(), UserController.updateSelfExclusion)

export { userRouter }
