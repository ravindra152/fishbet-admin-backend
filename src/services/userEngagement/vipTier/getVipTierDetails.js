// import { Op } from "sequelize";
import db from '@src/db/models';
import {BaseHandler} from '@src/libs/logicBase';
// import { pageValidation } from "../../utils/common";
import { SUCCESS_MSG } from '@src/utils/success';
import { AppError } from '@src/errors/app.error';
import { Errors } from '@src/errors/errorCodes';

export class GetVipTierDetailsHandler extends BaseHandler {
  async run() {
    const { vipTierId } = this.args;

    // Fetch VIP Tier details
    const vipTier = await db.VipTier.findOne({
      where: { vipTierId },
    });

    if (!vipTier) {
      throw new AppError(Errors.VIP_TIER_NOT_EXISTS);
    }

    return {
      success: true,
      data: vipTier,
      message: SUCCESS_MSG.GET_SUCCESS,
    };
  }
}
