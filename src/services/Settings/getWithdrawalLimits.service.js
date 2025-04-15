import db from "@src/db/models";
import { AppError } from "@src/errors/app.error";
import { Errors } from "@src/errors/errorCodes";
import { BaseHandler } from "@src/libs/logicBase";
import { GLOBAL_SETTING } from "@src/utils/constant";

export class GetWithdrawalLimitsService extends BaseHandler{
  async run(){
    const withdrawalLimits = await db.GlobalSetting.findOne({
      where: { key: GLOBAL_SETTING.WITHDRAWAL_LIMITS},
    })

    if(!withdrawalLimits)
      throw new AppError(Errors.WITHDRAWAL_LIMITS_SETTINGS_DOES_NOT_EXISTS)

    return {message: 'Success',withdrawalLimits: withdrawalLimits.value}

  }
}
