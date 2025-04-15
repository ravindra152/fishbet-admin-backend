import { sendResponse } from "@src/helpers/response.helpers"
import CreateChatRainService from "@src/services/chatModule/chatRain/createChatRain"
import GetChatRainService from "@src/services/chatModule/chatRain/getChatRain"
import UpdateChatRainService from "@src/services/chatModule/chatRain/updateChatRain"
import CreateChatRuleService from "@src/services/chatModule/chatRule/createChatRule"
import GetChatRuleService from "@src/services/chatModule/chatRule/getChatRule"
import UpdateChatRuleService from "@src/services/chatModule/chatRule/updateChatRule"
import CreateChatGroupService from "@src/services/chatModule/chatGroup/createChatGroup"
import GetAllChatGroupService from "@src/services/chatModule/chatGroup/getAllChatGroup"
import GetChatGroupUsersService from "@src/services/chatModule/chatGroup/getChatGroupUsers"
import GetGroupMessageService from "@src/services/chatModule/message/getGroupMessage"
import UpdateChatGroupService from "@src/services/chatModule/chatGroup/updateChatGroup"
import CreateOffensiveWordService from "@src/services/chatModule/offensiveWord/createOffensiveWord"
import DeleteOffensiveWordService from "@src/services/chatModule/offensiveWord/deleteOffensiveWord"
import GetOffensiveWordsService from "@src/services/chatModule/offensiveWord/getOffensiveWords"
import GetReportedUserService from "@src/services/chatModule/reportedUser/getReportedUser"
import GetUserMessageService from "@src/services/chatModule/message/getUserMessage"

export default class LiveChatController {

    static async createChatGroup(req, res, next) {
        try {
            const data = await CreateChatGroupService.execute({ ...req.body }, req.context)
            sendResponse({ req, res, next }, data)
        } catch (error) {
            next(error)
        }
    }
    static async updateChatGroup(req, res, next) {
        try {
            const data = await UpdateChatGroupService.execute({ ...req.body }, req.context)
            sendResponse({ req, res, next }, data)

        } catch (error) {
            next(error)
        }
    }

    static async getChatGroup(req, res, next) {
        try {
            const data = await GetAllChatGroupService.execute({ ...req.query }, req.context)
            sendResponse({ req, res, next }, data)
        } catch (error) {
            next(error)
        }
    }

    static async getChatGroupUsers(req, res, next) {
        try {
            const data = await GetChatGroupUsersService.execute({ ...req.query }, req.context)
            sendResponse({ req, res, next }, data)
        } catch (error) {
            next(error)
        }
    }

    static async getGroupMessage(req, res, next) {
        try {
            const data = await GetGroupMessageService.execute({ ...req.query }, req.context)
            sendResponse({ req, res, next }, data)
        } catch (error) {
            next(error)
        }
    }

    static async getUserMessage(req, res, next) {
        try {
            const data = await GetUserMessageService.execute({ ...req.query }, req.context)
            sendResponse({ req, res, next }, data)

        } catch (error) {
            next(error)
        }
    }

    static async getReportedUser(req, res, next) {
        try {
            const data = await GetReportedUserService.execute({ ...req.query }, req.context)
            sendResponse({ req, res, next }, data)
        } catch (error) {
            next(error)
        }
    }

    static async createChatRain(req, res, next) {
        try {
            const data = await CreateChatRainService.execute({ ...req.body }, req.context)
            sendResponse({ req, res, next }, data)
        } catch (error) {
            next(error)
        }
    }

    static async updateChatRain(req, res, next) {
        try {
            const data = await UpdateChatRainService.execute({ ...req.body }, req.context)
            sendResponse({ req, res, next }, data)
        } catch (error) {
            next(error)
        }
    }

    static async getChatRain(req, res, next) {
        try {
            const data = await GetChatRainService.execute({ ...req.query }, req.context)
            sendResponse({ req, res, next }, data)
        } catch (error) {
            next(error)
        }
    }

    static async createChatRule(req, res, next) {
        try {
            const data = await CreateChatRuleService.execute({ ...req.body }, req.context)
            sendResponse({ req, res, next }, data)
        } catch (error) {
            next(error)
        }
    }

    static async updateChatRule(req, res, next) {
        try {
            const data = await UpdateChatRuleService.execute({ ...req.body }, req.context)
            sendResponse({ req, res, next }, data)
        } catch (error) {
            next(error)
        }
    }

    static async getChatRule(req, res, next) {
        try {
            const data = await GetChatRuleService.execute({ ...req.query }, req.context)
            sendResponse({ req, res, next }, data)
        } catch (error) {
            next(error)
        }
    }

    static async getOffensiveWords(req, res, next) {
        try {
            const data = await GetOffensiveWordsService.execute({ ...req.query }, req.context)
            sendResponse({ req, res, next }, data)
        } catch (error) {
            next(error)
        }
    }

    static async createOffensiveWord(req, res, next) {
        try {
            const data = await CreateOffensiveWordService.execute({ ...req.body }, req.context)
            sendResponse({ req, res, next }, data)
        } catch (error) {
            next(error)
        }
    }

    static async deleteOffensiveWord(req, res, next) {
        try {
            const data = await DeleteOffensiveWordService.execute({ ...req.query }, req.context)
            sendResponse({ req, res, next }, data)
        } catch (error) {
            next(error)
        }
    }

}