import db from "@src/db/models";
import { AppError } from "@src/errors/app.error";
import { Errors } from "@src/errors/errorCodes";
import { BaseHandler } from "@src/libs/logicBase";
import { SUCCESS_MSG } from "@src/utils/success";

export default class UpdateChatRuleService extends BaseHandler {
    async run() {
        const transaction = this.context.sequelizeTransaction
        const { rule, chatRuleId } = this.args
        const chatRule = await db.ChatRule.findByPk(chatRuleId)
        if (!chatRule) throw new AppError(Errors.CHAT_RULE_NOT_FOUND)
        const updateChatRule = await db.ChatRule.update({ rules: rule }, { where: { id: chatRuleId }, transaction })
        return { updateChatRule, message: SUCCESS_MSG.UPDATE_SUCCESS }
    }
}