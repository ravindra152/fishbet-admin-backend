import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { getOne, updateEntity } from '@src/services/helper/crud'
import { getAllPortalUserIds } from '@src/utils/common'
import { BREAK_TYPE, SELF_EXCLUSION_TYPE } from '@src/utils/constant'
import { SUCCESS_MSG } from '@src/utils/success'

export class SetDisableUntilHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    let { userId, type, days, reset, portal } = this.args
    let userData, updateDisableUntil
    let commonUserId = userId

    userData = await getOne({
      model: db.User,
      data: { userId },
      attributes: ['email', 'userId', 'currencyCode'],
      include: [{
        model: db.UserDetails,
        as: 'userDetails',
        attributes: ['selfExclusion', 'selfExclusionUpdatedAt']
      }]
    })

    if (!userData) throw new AppError(Errors.USER_NOT_EXISTS)
    if (reset && type === BREAK_TYPE.TAKE_A_BREAK) {
      return { updateDisableUntil: await userData.userDetails.set({ selfExclusion: null, selfExclusionUpdatedAt: new Date() }).save() }
    }

    if (reset && type === BREAK_TYPE.SELF_EXCLUSION) {
      return {
        updateDisableUntil: await updateEntity({
          model: db.Limit,
          values: { userId },
          data: { selfExclusion: null, isSelfExclusionPermanent: null, selfExclusionType: null, selfExclusionUpdatedAt: new Date() }
        })
      }
    }

    let timeStamp, isSelfExclusionPermanent

    if (!type) type = BREAK_TYPE.TAKE_A_BREAK
    if (type === BREAK_TYPE.TAKE_A_BREAK) {
      if (days <= 0 || days > 30) throw new AppError(Errors.TAKE_ABREAK_DAY)

      const now = new Date()
      now.setDate(now.getDate() + days)
      timeStamp = now

      updateDisableUntil = await updateEntity({
        model: db.UserDetails,
        values: { userId },
        data: { selfExclusion: timeStamp, selfExclusionUpdatedAt: new Date() }
      })
    } else if (type === BREAK_TYPE.SELF_EXCLUSION) {
      if (days === -1) {
        timeStamp = null
        isSelfExclusionPermanent = true
      } else {
        const now = new Date()
        now.setDate(now.getDate() + days)
        timeStamp = now
        isSelfExclusionPermanent = false
      }

      if (portal === SELF_EXCLUSION_TYPE.ALL) commonUserId = await getAllPortalUserIds(userData.email, days)

      updateDisableUntil = await updateEntity({
        model: db.Limit,
        data: { selfExclusion: timeStamp, isSelfExclusionPermanent, selfExclusionType: portal, selfExclusionUpdatedAt: new Date() },
        values: { userId: commonUserId }
      })
    }

    return { updateDisableUntil, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
