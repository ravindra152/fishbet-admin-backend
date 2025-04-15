import db from "@src/db/models"
import { AppError } from "@src/errors/app.error"
import { BaseHandler } from "@src/libs/logicBase"
import { getOne, updateEntity } from "@src/utils/crud"
import { SUCCESS_MSG } from "@src/utils/success"
import { Errors } from '@src/errors/errorCodes'

export class UpdateSpinWheelHandler extends BaseHandler {

  async run() {

    const transaction = this.context.sequelizeTransaction

    let { wheelDivisionId,sc,gc, priority, isAllow, playerLimit } = this.args
    const checkWheelConfigExists = await getOne({
      model: db.WheelDivisionConfiguration,
      data: { wheelDivisionId: wheelDivisionId }
    })

    if (!checkWheelConfigExists) throw new AppError(Errors.INVALID_WHEEL_DIVISION_ID)

    await updateEntity({
      model: db.WheelDivisionConfiguration,
      values: { wheelDivisionId },
      data: { sc, gc, isAllow, playerLimit, priority },
      transaction
    })

    return { wheelDivisionId: wheelDivisionId, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}
