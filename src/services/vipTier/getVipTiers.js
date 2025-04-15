import { Op } from "sequelize";
import db from '@src/db/models';
import { BaseHandler } from '@src/libs/logicBase';
// import { pageValidation } from "../../utils/common";
import { SUCCESS_MSG } from '@src/utils/success';
import { Errors } from "@src/errors/errorCodes";
import { pageValidation } from "@src/utils/common";


export class GetVipTiersHandler extends BaseHandler {
  async run() {
    const { limit, pageNo, search, orderBy, sort, isActive } = this.args;

    // Initialize query filters
    let query = {};
    if (search) {
      query = { ...query, name: { [Op.iLike]: `%${search.trim()}%` } };
    }
    if (isActive) query = { ...query, isActive };

    // Pagination
    const { page, size } = pageValidation(pageNo, limit);

    const vipTiers = await db.VipTier.findAndCountAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: query,
      include: [
        {
          model: db.Reward,
          as: 'rewards', // Include rewards for each VIP Tier
          attributes: { exclude: ['createdAt', 'updatedAt'] }, // Exclude unwanted attributes
        }
      ],
      order: [[orderBy || "level", sort || "ASC"]],
      limit: size,
      offset: (page - 1) * size,
    });

    if (!vipTiers) throw new AppError(Errors.VIP_TIERS_NOT_EXISTS)

    // Response
    return {
      data: {
        vipTiers,
        totalCount: vipTiers.count,
        page,
        size,
      },
      message: SUCCESS_MSG.GET_SUCCESS,
    };
  }
}
