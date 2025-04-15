import db from "@src/db/models";
import { BaseHandler } from "@src/libs/logicBase";
import { filterByRule, pageValidation } from "@src/utils/common";

export default class GetChatRuleService extends BaseHandler {
    async run() {
        const { pageNo, limit, search } = this.args
        let query = {}
        const { page, size } = pageValidation(pageNo, limit)
        if (search) query = filterByRule(query, search)
        const chatRules = await db.ChatRule.findAndCountAll({
            where: query,
            limit: size,
            offset: ((page - 1) * size)
        })
        return { chatRules: chatRules.rows, page, totalPages: Math.ceil(chatRules.count / size) }
    }
}