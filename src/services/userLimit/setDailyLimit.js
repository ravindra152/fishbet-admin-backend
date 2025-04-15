import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { createNewEntity, getOne } from '@src/services/helper/crud'
import { BET_LIMIT_CURRENCY_CHECK, LIMIT_TIME_PERIOD } from '@src/utils/constant'
import { SUCCESS_MSG } from '@src/utils/success'

export class SetDailyLimitHandler extends BaseHandler {

  async run() {
    const { userId, currencyCode, dailyLimit, timePeriod, reset } = this.args
    let user

    if (!BET_LIMIT_CURRENCY_CHECK.includes(currencyCode.toUpperCase())) throw new AppError(Errors.CURRENCY_NOT_FOUND)

    user = await getOne({
      model: db.User,
      data: { userId }
    })

    if (!user) throw new AppError(Errors.USER_NOT_EXISTS)
    let userLimits = await getOne({ model: db.BetLimit, data: { userId, currencyCode } })
    if (!userLimits) {
      await createNewEntity({ model: db.BetLimit, data: { userId, currencyCode } })
      userLimits = await getOne({ model: db.BetLimit, data: { userId, currencyCode } })
    }

    let limit = userLimits.dataValues

    if (timePeriod === LIMIT_TIME_PERIOD.DAILY) {
      if (reset) {
        return { limit: await userLimits.set({ dailyBetLimit: null, dailyBetExpiry: null, dailyBetUpdatedAt: new Date() }).save() }
      }
      if (userLimits.weeklyBetLimit && dailyLimit > userLimits.weeklyBetLimit) {
        throw new AppError(Errors.DAILY_LIMIT)
      }
      if (userLimits.monthlyBetLimit && dailyLimit > userLimits.monthlyBetLimit) {
        throw new AppError(Errors.DAILY_LIMIT)
      }

      const now = new Date()
      now.setDate(now.getDate() + 1)

      limit = await userLimits.set({ dailyBetLimit: dailyLimit, dailyBetExpiry: now, dailyBetUpdatedAt: new Date() }).save()
    } else if (timePeriod === LIMIT_TIME_PERIOD.WEEKLY) {
      if (reset) {
        return { limit: await userLimits.set({ weeklyBetLimit: null, weeklyBetExpiry: null, weeklyBetUpdatedAt: new Date() }).save() }
      }
      if (userLimits.dailyBetLimit && dailyLimit < userLimits.dailyBetLimit) {
        throw new AppError(Errors.WEEKLY_LIMIT)
      }
      if (userLimits.monthlyBetLimit && dailyLimit > userLimits.monthlyBetLimit) {
        throw new AppError(Errors.WEEKLY_LIMIT)
      }

      const now = new Date()
      now.setDate(now.getDate() + 1)

      limit = await userLimits.set({ weeklyBetLimit: dailyLimit, weeklyBetExpiry: now, weeklyBetUpdatedAt: new Date() }).save()
    } else if (timePeriod === LIMIT_TIME_PERIOD.MONTHLY) {
      if (reset) {
        return { limit: await userLimits.set({ monthlyBetLimit: null, monthlyBetExpiry: null, monthlyBetUpdatedAt: new Date() }).save() }
      }
      if (userLimits.dailyBetLimit && dailyLimit < userLimits.dailyBetLimit) {
        throw new AppError(Errors.MONTHLY_LIMIT)
      }
      if (userLimits.weeklyBetLimit && dailyLimit < userLimits.weeklyBetLimit) {
        throw new AppError(Errors.MONTHLY_LIMIT)
      }

      const now = new Date()
      now.setDate(now.getDate() + 1)

      limit = await userLimits.set({ monthlyBetLimit: dailyLimit, monthlyBetExpiry: now, monthlyBetUpdatedAt: new Date() }).save()
    }

    return { limit, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
