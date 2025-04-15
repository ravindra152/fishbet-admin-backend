import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'

export class DeleteBonusHandler extends BaseHandler {
  async run () {
    const transaction = this.context.sequelizeTransaction

    const checkBonusExist = await db.Bonus.findOne({
      where: { id: this.args.bonusId }
    })

    if (!checkBonusExist) throw new AppError(Errors.BONUS_NOT_FOUND)
    if (checkBonusExist.claimedCount > 0) throw new AppError(Errors.USER_BONUS)

    await db.Bonus.destroy({ where: { id: checkBonusExist.id } }, { transaction })
    return { success: true, message: SUCCESS_MSG.DELETE_SUCCESS }
  }
}
