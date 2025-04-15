import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { USER_BONUS_STATUS_VALUES } from '@src/utils/constants/bonus.constants'
import { SUCCESS_MSG } from '@src/utils/success'

const schema = {
  type: 'object',
  properties: {
    userId: { type: 'string' },
    bonusId: { type: ['string', 'null'] },
    user: { type: ['object', 'null'] }
  },
  required: ['userId']
}



export class RemoveBonusHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run() {
    const { userId, bonusId } = this.args;
    const transaction = this.context.sequelizeTransaction

    const userbonus = await db.UserBonus.findOne({ where: { userId, bonusId } })
    if (!userbonus) {
      throw new AppError(Errors.USER_BONUS_NOT_FOUND)
    }

    userbonus.status = USER_BONUS_STATUS_VALUES.CANCELLED
    userbonus.cancelledBy = this.args.user.email
    userbonus.expireAt = Date.now()

    await userbonus.save({ transaction })
    return { userbonus, success: true, message: SUCCESS_MSG.CANCEL_SUCCESS }
  }

  catch (error) {
    this.addError('InternalServerErrorType', error)
  }
}
