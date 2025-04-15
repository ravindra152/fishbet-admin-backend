import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'

export class updateGroupHandler extends BaseHandler {

  async run() {
    const { groupId, name, isActive } = this.args

    const transaction = this.context.sequelizeTransaction
    const group = await db.Group.findOne({
      where: { id: groupId }
    })
    if (!group) throw new AppError(Errors.GROUP_NOT_FOUND)

    const updateData = {}
    if (isActive == true || isActive == false) updateData.isActive = isActive
    if (name) updateData.name = name
    await group.set(updateData).save({ transaction })

    return { success: true, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}
