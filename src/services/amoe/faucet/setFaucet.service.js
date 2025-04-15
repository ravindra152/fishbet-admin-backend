import db from "@src/db/models"
import { AppError } from "@src/errors/app.error"
import { BaseHandler } from "@src/libs/logicBase"
import { GLOBAL_SETTING } from "@src/utils/constant"
import { Errors } from "@src/errors/errorCodes"
import { updateEntity } from "@src/utils/crud"

export class SetFaucetHandler extends BaseHandler {
  async run() {
    const { SC, GC, interval } = this.args
    const transaction = this.dbTransaction

    let faucet = await db.GlobalSetting.findOne({
      where: { key: GLOBAL_SETTING.FAUCET_SETTING },
      transaction
    })

    if (!faucet) throw new AppError(Errors.FAUCET_SETTINGS_DOES_NOT_EXISTS)

    const settings = (faucet.value)
    if (SC) settings.SC = SC
    if (GC) settings.GC = GC
    if (interval) settings.interval = interval

    await updateEntity({
      model: db.GlobalSetting,
      data: { value: settings },
      values: { key: GLOBAL_SETTING.FAUCET_SETTING },
      transaction
    })

    return { message: 'Success', UpdatedFaucetSettings: faucet.value }
  }
}
