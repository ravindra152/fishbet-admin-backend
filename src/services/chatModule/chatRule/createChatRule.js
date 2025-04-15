import db from "@src/db/models";
import { BaseHandler } from "@src/libs/logicBase";
import { SUCCESS_MSG } from "@src/utils/success";

export default class CreateChatRuleService extends BaseHandler {
    async run() {
        const transaction = this.context.sequelizeTransaction
        const { rule } = this.args
        const newChatRule = await db.ChatRule.create({ rules: rule }, { transaction })
        return { newChatRule, message: SUCCESS_MSG.CREATE_SUCCESS }
    }
}