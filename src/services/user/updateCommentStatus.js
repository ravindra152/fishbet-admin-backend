import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { getOne, updateEntity } from '@src/services/helper/crud'
import { SUCCESS_MSG } from '@src/utils/success'



export class UpdateCommentStatusHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const { userId, commentId, status } = this.args

    const userExist = await getOne({ model: db.User, data: { userId }, attributes: ['userId'] })

    if (!userExist) throw new AppError(Errors.USER_NOT_EXISTS)

    const updateComment = await updateEntity({ model: db.Comment, data: { status: status }, values: { commentId } })

    return { updateComment, success: true, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}
