import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import { getOne } from '@src/services/helper/crud'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'


export class SetTimeLimitHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const { userId, timeLimit, reset } = this.args
    let user

    user = await getOne({ model: db.User, data: { userId } })

    if (!user) throw new AppError(Errors.USER_NOT_EXISTS)
    if (reset) {
      await db.Limit.update({ timeLimit: null, timeLimitExpiry: null, timeLimitUpdatedAt: new Date() }, { where: { userId } })
      return { reset: true }
    }

    if (timeLimit > 24 || timeLimit < 1) throw new AppError(Errors.SESSION_TIME_LIMIT)

    const now = new Date()
    now.setDate(now.getDate() + 1)

    await db.Limit.update({ timeLimit, timeLimitExpiry: now, timeLimitUpdatedAt: new Date() }, { where: { userId } })

    const newLimits = await getOne({ model: db.Limit, data: { userId } })

    return { limit: newLimits, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
