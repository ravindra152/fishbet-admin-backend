import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { getOne } from '@src/services/helper/crud'
import { LIMIT_TIME_PERIOD } from '@src/utils/constant'
import { SUCCESS_MSG } from '@src/utils/success'

export class SetLossLimitHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const { userId, lossLimit, timePeriod, reset } = this.args

    const user = await getOne({ model: db.User, data: { userId } })

    if (!user) throw new AppError(Errors.USER_NOT_EXISTS)

    const userLimits = await getOne({ model: db.Limit, data: { userId } })
    let limit = userLimits.dataValues

    if (timePeriod === LIMIT_TIME_PERIOD.DAILY) {
      if (reset) {
        return { limit: await userLimits.set({ dailyLossLimit: null, dailyLossExpiry: null, dailyLossUpdatedAt: new Date() }).save() }
      }
      if (userLimits.weeklyLossLimit && lossLimit > userLimits.weeklyLossLimit) {
        throw new AppError(Errors.DAILY_LIMIT)
      }
      if (userLimits.monthlyLossLimit && lossLimit > userLimits.monthlyLossLimit) {
        throw new AppError(Errors.DAILY_LIMIT)
      }

      const now = new Date()
      now.setDate(now.getDate() + 1)

      limit = await userLimits.set({ dailyLossLimit: lossLimit, dailyLossExpiry: now, dailyLossUpdatedAt: new Date() }).save()
    } else if (timePeriod === LIMIT_TIME_PERIOD.WEEKLY) {
      if (reset) {
        return { limit: await userLimits.set({ weeklyLossLimit: null, weeklyLossExpiry: null, weeklyLossUpdatedAt: new Date() }).save() }
      }
      if (userLimits.dailyLossLimit && lossLimit < userLimits.dailyLossLimit) {
        throw new AppError(Errors.WEEKLY_LIMIT)
      }
      if (userLimits.monthlyLossLimit && lossLimit > userLimits.monthlyLossLimit) {
        throw new AppError(Errors.WEEKLY_LIMIT)
      }

      const now = new Date()
      now.setDate(now.getDate() + 1)

      limit = await userLimits.set({ weeklyLossLimit: lossLimit, weeklyLossExpiry: now, weeklyLossUpdatedAt: new Date() }).save()
    } else if (timePeriod === LIMIT_TIME_PERIOD.MONTHLY) {
      if (reset) {
        return { limit: await userLimits.set({ monthlyLossLimit: null, monthlyLossExpiry: null, monthlyLossUpdatedAt: new Date() }).save() }
      }
      if (userLimits.dailyLossLimit && lossLimit < userLimits.dailyLossLimit) {
        throw new AppError(Errors.MONTHLY_LIMIT)
      }
      if (userLimits.weeklyLossLimit && lossLimit < userLimits.weeklyLossLimit) {
        throw new AppError(Errors.MONTHLY_LIMIT)
      }

      const now = new Date()
      now.setDate(now.getDate() + 1)

      limit = await userLimits.set({ monthlyLossLimit: lossLimit, monthlyLossExpiry: now, monthlyLossUpdatedAt: new Date() }).save()
    }

    return { limit, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
