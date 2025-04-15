import db from "@src/db/models";
import { BaseHandler } from "@src/libs/logicBase";
import { filterByDateCreatedAt, filterByName, pageValidation } from "@src/utils/common";
import { SUCCESS_MSG } from "@src/utils/success";

export default class GetAllChatGroupService extends BaseHandler {
    async run() {
        const { limit, pageNo, search, status, startDate, endDate } = this.args
        let query = {}
        const { page, size } = pageValidation(pageNo, limit)
        if (status && (status !== '' || status !== null)) query = { ...query, status }
        if (search) query = filterByName(query, search)
        if (startDate || endDate) query = filterByDateCreatedAt(query, startDate, endDate, 'ChatGroup')
        const allGroups = await db.ChatGroup.findAndCountAll({
            where: query,
            attributes: { exclude: ['admins', 'updatedAt'] },
            limit: size,
            offset: ((page - 1) * size),
            order: [['createdAt', 'DESC']]
        })

        return { groups: allGroups.rows, page, totalPages: Math.ceil(allGroups.count / size), message: SUCCESS_MSG.GET_SUCCESS }
    }
}