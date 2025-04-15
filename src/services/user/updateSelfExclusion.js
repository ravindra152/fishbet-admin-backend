import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { dayjs } from '@src/libs/dayjs'
import { Logger } from '@src/libs/logger'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'

export class UpdateSelfExclusionHandler extends BaseHandler {
  async run() {
    const { userId, removeSelfExclusion, days, type, permanent } = this.args
    const transaction = this.context.sequelizeTransaction
    const selfExclusionUpdatedAt = dayjs()
    const selfExclusionEndDate = dayjs().add(days, 'day')

    const user = await db.User.findOne({
      where: { userId },
      attributes: ['userId'],
      transaction
    })
    if (!user) { throw new AppError(Errors.USER_NOT_EXISTS) }
    switch (type) {
      case 'SELF_EXCLUSION':
        if (removeSelfExclusion) {
          await db.Limit.update({ selfExclusionStartedAt: selfExclusionUpdatedAt, selfExclusionEndAt: null, isSelfExclusionPermanent: false },
            { where: { userId }, transaction })
        } else {
          await db.Limit.upsert(
            {
              userId,
              selfExclusionEndAt: selfExclusionEndDate,
              isSelfExclusionPermanent: permanent,
              selfExclusionStartedAt: selfExclusionUpdatedAt,
            }, { transaction })
        }
        break
      default:
        Logger.info('Invalid Type in user limit..')

    }


    return { message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}