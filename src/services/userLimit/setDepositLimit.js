import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { getOne } from '@src/services/helper/crud'
import { LIMIT_TIME_PERIOD } from '@src/utils/constant'
import { SUCCESS_MSG } from '@src/utils/success'

export class SetDepositLimitHandler extends BaseHandler {

  async run() {
    const { userId, depositLimit, timePeriod, reset } = this.args

    const user = await getOne({ model: db.User, data: { userId } })

    if (!user) throw new AppError(Errors.USER_NOT_EXISTS)

    const userLimits = await getOne({ model: db.Limit, data: { userId } })
    let limit = userLimits.dataValues

    if (timePeriod === LIMIT_TIME_PERIOD.DAILY) {
      if (reset) {
        return { limit: await userLimits.set({ dailyDepositLimit: null, dailyDepositExpiry: null, dailyDepositUpdatedAt: new Date() }).save() }
      }
      if (userLimits.weeklyDepositLimit && depositLimit > userLimits.weeklyDepositLimit) {
        throw new AppError(Errors.DAILY_LIMIT)
      }
      if (userLimits.monthlyDepositLimit && depositLimit > userLimits.monthlyDepositLimit) {
        throw new AppError(Errors.DAILY_LIMIT)
      }

      const now = new Date()
      now.setDate(now.getDate() + 1)

      limit = await userLimits.set({ dailyDepositLimit: depositLimit, dailyDepositExpiry: now, dailyDepositUpdatedAt: new Date() }).save()
    } else if (timePeriod === LIMIT_TIME_PERIOD.WEEKLY) {
      if (reset) {
        return { limit: await userLimits.set({ weeklyDepositLimit: null, weeklyDepositExpiry: null }).save() }
      }
      if (userLimits.dailyDepositLimit && depositLimit < userLimits.dailyDepositLimit) {
        throw new AppError(Errors.WEEKLY_LIMIT)
      }
      if (userLimits.monthlyDepositLimit && depositLimit > userLimits.monthlyDepositLimit) {
        throw new AppError(Errors.WEEKLY_LIMIT)
      }

      const now = new Date()
      now.setDate(now.getDate() + 1)

      limit = await userLimits.set({ weeklyDepositLimit: depositLimit, weeklyDepositExpiry: now, weeklyDepositUpdatedAt: new Date() }).save()
    } else if (timePeriod === LIMIT_TIME_PERIOD.MONTHLY) {
      if (reset) {
        return { limit: await userLimits.set({ monthlyDepositLimit: null, monthlyDepositExpiry: null, monthlyDepositUpdatedAt: new Date() }).save() }
      }
      if (userLimits.dailyDepositLimit && depositLimit < userLimits.dailyDepositLimit) {
        throw new AppError(Errors.MONTHLY_LIMIT)
      }
      if (userLimits.weeklyDepositLimit && depositLimit < userLimits.weeklyDepositLimit) {
        throw new AppError(Errors.MONTHLY_LIMIT)
      }

      const now = new Date()
      now.setDate(now.getDate() + 1)

      limit = await userLimits.set({ monthlyDepositLimit: depositLimit, monthlyDepositExpiry: now, monthlyDepositUpdatedAt: new Date() }).save()
    }

    return { limit, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
