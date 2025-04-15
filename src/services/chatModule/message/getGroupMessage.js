import db from "@src/db/models";
import { BaseHandler } from "@src/libs/logicBase";
import { filterByDateCreatedAt, filterByMessage, pageValidation } from "@src/utils/common";
import { SUCCESS_MSG } from "@src/utils/success";

export default class GetGroupMessageService extends BaseHandler {
    async run() {
        const { limit, pageNo, chatGroupId, userId, startDate, endDate, search } = this.args
        let query = { chatGroupId }
        const { page, size } = pageValidation(pageNo, limit)
        if (userId) query = { ...query, actionee_id: userId }
        if (search) query = filterByMessage(query, search)
        if (startDate || endDate) query = filterByDateCreatedAt(query, startDate, endDate, 'Message')
        const records = await db.Message.findAndCountAll({
            where: { ...query },
            attributes: ['id', 'message', 'actioneeId', ['message_binary', 'gif'], 'messageType', 'status', 'isContainOffensiveWord', 'createdAt'],
            order: [['createdAt', 'DESC']],
            limit: size,
            offset: ((page - 1) * size)
        })

        return { records: records.rows, page, totalPages: Math.ceil(records.count / size), message: SUCCESS_MSG.GET_SUCCESS }

    }
}
