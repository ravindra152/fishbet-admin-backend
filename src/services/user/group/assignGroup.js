import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'

export class AssignGroupHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const { userId, groupId } = this.args

    const transaction = this.context.sequelizeTransaction
    const user = await db.User.findOne({
      where: { userId }
    })
    if (!user) throw new AppError(Errors.USER_NOT_EXISTS)

    let message
    const group = await db.UserGroup.findOne({
      where: { userId }
    })
    if (group) {
      await group.set({ groupId }).save({ transaction })
      message = SUCCESS_MSG.UPDATE_SUCCESS
    } else {
      await db.UserGroup.create({ userId, groupId }, { transaction })
      message = SUCCESS_MSG.CREATE_SUCCESS
    }

    return { success: true, message }
  }
}
