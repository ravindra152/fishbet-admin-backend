import db from "@src/db/models"
import { AppError } from "@src/errors/app.error"
import { Errors } from "@src/errors/errorCodes"
import { BaseHandler } from "@src/libs/logicBase"
import { GLOBAL_SETTING } from "@src/utils/constant"

export class UpdateWithdrawalLimitsService extends BaseHandler {
  async run() {
    const { minAmount, maxAmountWithoutRequest } = this.args
    const transaction = this.dbTransaction

    const withdrawalLimits = await db.GlobalSetting.findOne({
      where: { key: GLOBAL_SETTING.WITHDRAWAL_LIMITS },
      transaction
    })

    if (!withdrawalLimits) throw new AppError(Errors.WITHDRAWAL_LIMITS_SETTINGS_DOES_NOT_EXISTS)

    const limits = (withdrawalLimits.value)
    if (minAmount) limits.minAmount = minAmount
    if (maxAmountWithoutRequest) limits.maxAmountWithoutRequest = maxAmountWithoutRequest

    await db.GlobalSetting.update({ value: limits }, {
      where: { key: GLOBAL_SETTING.WITHDRAWAL_LIMITS },
      transaction
    })

    return { message: 'Success', UpdatedFaucetSettings: withdrawalLimits.value }
  }
}
