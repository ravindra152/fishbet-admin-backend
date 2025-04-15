import db from "@src/db/models";
import { BaseHandler } from "@src/libs/logicBase";
import { filterByDate, pageValidation } from "@src/utils/common";
import { Op } from "sequelize";
import { dayjs } from '@src/libs/dayjs'
import { AppError } from "@src/errors/app.error";
import { Logger } from '@src/libs/logger';


export class GetWithdrawRequestsHandler extends BaseHandler {
  async run() {
    const { limit = 10, pageNo = 1, status, userId, startDate, endDate, search } = this.args;

    const { page, size } = pageValidation(pageNo, limit);

    let query = {};

    if (userId) query = { ...query, userId };
    if (status) query = { ...query, status };

    if (startDate || endDate) {
      if (startDate) {
        const start = dayjs(startDate).startOf('day').utc().toDate();
        query.createdAt = { ...query.createdAt, [Op.gte]: start };
      }

      if (endDate) {
        const end = dayjs(endDate).endOf('day').utc().toDate();
        query.createdAt = { ...query.createdAt, [Op.lte]: end };
      }
    }

    let queryForUser = {};
    if (search) {
      let filteredSearch = search.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_');
      queryForUser = {
        [Op.or]: [
          { username: { [Op.iLike]: `%${filteredSearch}%` } },
          { email: { [Op.iLike]: `%${filteredSearch}%` } }
        ]
      };
    }

    console.log('Final query:', query);
    console.log('User query for search:', queryForUser);

    try {
      const withdrawRequests = await db.WithdrawalRequest.findAndCountAll({
        order: [["createdAt", "DESC"]],
        where: query,
        limit: size,
        offset: (page - 1) * size,
        include: [
          {
            model: db.User,
            attributes: ["userId", "username", "email"],
            where: queryForUser,
          },
          {
            model: db.Transaction,
            as: 'withdrawalTransaction',
            attributes: { exclude: ["createdAt", "updatedAt"] }
          },
        ],
      });

      return {
        withdrawRequests: withdrawRequests.rows || [],
        totalCount: withdrawRequests.count,
        page,
        size
      };
    } catch (error) {
      Logger.error(error.response.data)
      throw new AppError(error.response.data);
    }
  }
}
