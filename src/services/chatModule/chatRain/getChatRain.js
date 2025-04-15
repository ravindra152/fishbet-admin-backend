import db from "@src/db/models";
import { BaseHandler } from "@src/libs/logicBase";
import { filterByDateCreatedAt, filterByName, pageValidation } from "@src/utils/common";
import { SUCCESS_MSG } from "@src/utils/success";
import _ from "lodash";

export default class GetChatRainService extends BaseHandler {
    async run() {
        const { limit, pageNo, groupId, search, startDate, endDate } = this.args
        let query = {}
        const { page, size } = pageValidation(pageNo, limit)
        if (search) query = filterByName(query, search)
        if (groupId) query.chatGroupId = groupId
        if (startDate || endDate) query = filterByDateCreatedAt(query, startDate, endDate, 'ChatRain')
        const filterCondition = _.omitBy(query, _.isNil)
        const chatRains = await db.ChatRain.findAndCountAll({
            where: filterCondition,
            order: [['id', 'desc']],
            limit: size,
            offset: ((page - 1) * size),
        })
        return { chatRains: chatRains.rows, page, totalPages: Math.ceil(chatRains.count / size), message: SUCCESS_MSG.GET_SUCCESS }
    }
}
