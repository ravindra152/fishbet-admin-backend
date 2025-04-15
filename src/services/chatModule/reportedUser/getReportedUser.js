import db from "@src/db/models";
import { BaseHandler } from "@src/libs/logicBase";
import { filterByDateCreatedAt, filterByDescription, pageValidation } from "@src/utils/common";
import { SUCCESS_MSG } from "@src/utils/success";
import { isNil, omitBy } from "lodash";
import sequelize from "sequelize";

export default class GetReportedUserService extends BaseHandler {
    async run() {
        const { limit, pageNo, userId, startDate, endDate, search } = this.args
        let query = {}
        const { page, size } = pageValidation(pageNo, limit)
        if (search) query = filterByDescription(query, search)
        if (startDate || endDate) query = filterByDateCreatedAt(query, startDate, endDate, 'ReportedUser')
        const filterCondition = omitBy(query, isNil)
        const reportedUser = await db.ReportedUser.findAll({
            where: filterCondition,
            attributes: ['reportedUserId', [sequelize.fn('COUNT', sequelize.col('reported_user_id')), 'reportCount']],
            group: ['reported_user_id', 'reportedUsers.user_id'],
            include: [{ model: db.User, as: 'reportedUsers', attributes: ['userId', 'email', 'firstName', 'lastName'] }],
            limit: size,
            offset: ((page - 1) * size)
        })
        return { data: reportedUser, message: SUCCESS_MSG.GET_SUCCESS }
    }
}