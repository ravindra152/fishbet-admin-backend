import db from "@src/db/models";
import { BaseHandler } from "@src/libs/logicBase";
import { filterByUserName, pageValidation } from "@src/utils/common";
import { SUCCESS_MSG } from "@src/utils/success";
import { Op } from "sequelize";

export default class GetChatGroupUsersService extends BaseHandler {
    async run() {
        const { limit, pageNo, chatGroupId, search, userId } = this.args
        let query = {}
        const { page, size } = pageValidation(pageNo, limit)
        if (search) query = filterByUserName(query, search)
        if (userId) query = { ...query, userId: { [Op.not]: userId } }
        const allUsers = await db.User.findAndCountAll({
            where: query,
            attributes: ["userId", "username", "firstName", "lastName", "email", "createdAt"],
            include: [{
                model: db.UserChatGroup,
                as: 'userChatGroups',
                where: { chatGroupId },
                required: true,
                attributes: []
            }],
            order: [['createdAt', 'DESC']],
            limit: size,
            offset: ((page - 1) * size),
        })

        return { users: allUsers.rows, page, totalPages: Math.ceil(allUsers.count / size), message: SUCCESS_MSG.GET_SUCCESS }
    }
}