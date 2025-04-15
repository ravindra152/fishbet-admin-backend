import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { getOne } from '@src/services/helper/crud'
import { SUCCESS_MSG } from '@src/utils/success'


export class SetInternalUserHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const { userId, userInternalStatus } = this.args

    const user = await getOne({ model: db.User, data: { userId }, attributes: ['userId', 'isInternalUser'] })

    if (!user) throw new AppError(Errors.USER_NOT_EXISTS)

    if (userInternalStatus) {
      await user.set({ isInternalUser: true }).save()
    } else {
      await user.set({ isInternalUser: false }).save()
    }

    return { success: true, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
