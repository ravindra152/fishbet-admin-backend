import { createChatGroupSchema } from '@src/json-schemas/chatModule/chatGroup/createChatGroup.schema'
import { getChatGroupsSchema } from '@src/json-schemas/chatModule/chatGroup/getChatGroups.schema'
import { getChatGroupUsersSchema } from '@src/json-schemas/chatModule/chatGroup/getChatGroupUsers.schema'
import { updateChatGroupSchema } from '@src/json-schemas/chatModule/chatGroup/updateChatGroup.schema'
import { createChatRainSchema } from '@src/json-schemas/chatModule/chatRain/createChatRain.schema'
import { getChatRainSchema } from '@src/json-schemas/chatModule/chatRain/getChatRain.schema'
import { updateChatRainSchema } from '@src/json-schemas/chatModule/chatRain/updateChatRain.schema'
import { createChatRuleSchema } from '@src/json-schemas/chatModule/chatRule/createChatRule.schema'
import { getChatRuleSchema } from '@src/json-schemas/chatModule/chatRule/getChatRule.schema'
import { updateChatRuleSchema } from '@src/json-schemas/chatModule/chatRule/updateChatRule.schema'
import { getGroupChatSchema } from '@src/json-schemas/chatModule/message/getGroupChat.schema'
import { getUserChatSchema } from '@src/json-schemas/chatModule/message/getUserChat.schema'
import { createOffensiveWordSchema } from '@src/json-schemas/chatModule/offensiveWords/createOffensiveWord.schema'
import { deleteOffensiveWordSchema } from '@src/json-schemas/chatModule/offensiveWords/deleteOffensiveWord.schema'
import { getOffensiveWordsSchema } from '@src/json-schemas/chatModule/offensiveWords/getOffensiveWord.schema'
import { getReportedUserSchema } from '@src/json-schemas/chatModule/reportedUser/getReportedUser.schema'
import LiveChatController from '@src/rest-resources/controllers/liveChat.controller'
import { isAdminAuthenticated } from '@src/rest-resources/middlewares'
import contextMiddleware from '@src/rest-resources/middlewares/context.middleware'
import { requestValidationMiddleware } from '@src/rest-resources/middlewares/requestValidation.middleware'
import express from 'express'
const args = { mergeParams: true }
const liveChatRouter = express.Router(args)

liveChatRouter.route('/create-group').post(contextMiddleware(true), requestValidationMiddleware(createChatGroupSchema),
    isAdminAuthenticated(), LiveChatController.createChatGroup)

liveChatRouter.route('/update-group').put(contextMiddleware(true), requestValidationMiddleware(updateChatGroupSchema),
    isAdminAuthenticated(), LiveChatController.updateChatGroup)

liveChatRouter.route('/get-group').get(contextMiddleware(false), requestValidationMiddleware(getChatGroupsSchema),
    isAdminAuthenticated(), LiveChatController.getChatGroup)

liveChatRouter.route('/get-group-users').get(contextMiddleware(false), requestValidationMiddleware(getChatGroupUsersSchema),
    isAdminAuthenticated(), LiveChatController.getChatGroupUsers)

liveChatRouter.route('/get-group-chats').get(contextMiddleware(false), requestValidationMiddleware(getGroupChatSchema),
    isAdminAuthenticated(), LiveChatController.getGroupMessage)

liveChatRouter.route('/get-user-chats').get(contextMiddleware(false), requestValidationMiddleware(getUserChatSchema),
    isAdminAuthenticated(), LiveChatController.getUserMessage)

liveChatRouter.route('/get-reported-user').get(contextMiddleware(false), requestValidationMiddleware(getReportedUserSchema),
    isAdminAuthenticated(), LiveChatController.getReportedUser)

liveChatRouter.route('/create-chat-rain').post(contextMiddleware(true), requestValidationMiddleware(createChatRainSchema),
    isAdminAuthenticated(), LiveChatController.createChatRain)

liveChatRouter.route('/update-chat-rain').put(contextMiddleware(true), requestValidationMiddleware(updateChatRainSchema),
    isAdminAuthenticated(), LiveChatController.updateChatRain)

liveChatRouter.route('/get-chat-rain').get(contextMiddleware(false), requestValidationMiddleware(getChatRainSchema),
    isAdminAuthenticated(), LiveChatController.getChatRain)

liveChatRouter.route('/get-chat-rule').get(contextMiddleware(false), requestValidationMiddleware(getChatRuleSchema),
    isAdminAuthenticated(), LiveChatController.getChatRule)

liveChatRouter.route('/create-chat-rule').post(contextMiddleware(true), requestValidationMiddleware(createChatRuleSchema),
    isAdminAuthenticated(), LiveChatController.createChatRule)

liveChatRouter.route('/update-chat-rule').put(contextMiddleware(true), requestValidationMiddleware(updateChatRuleSchema),
    isAdminAuthenticated(), LiveChatController.updateChatRule)

liveChatRouter.route('/get-offensive-words').get(contextMiddleware(false), requestValidationMiddleware(getOffensiveWordsSchema),
    isAdminAuthenticated(), LiveChatController.getOffensiveWords)

liveChatRouter.route('/create-offensive-word').post(contextMiddleware(true), requestValidationMiddleware(createOffensiveWordSchema),
    isAdminAuthenticated(), LiveChatController.createOffensiveWord)

liveChatRouter.route('/delete-offensive-word').delete(contextMiddleware(true), requestValidationMiddleware(deleteOffensiveWordSchema),
    isAdminAuthenticated(), LiveChatController.deleteOffensiveWord)

export { liveChatRouter }
