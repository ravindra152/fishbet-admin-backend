import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { createNewEntity, getOne } from '@src/services/helper/crud'
import { SUCCESS_MSG } from '@src/utils/success'


export class AddCommentHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const { comment, title, userId, user } = this.args
    let userExist

    userExist = await getOne({ model: db.User, data: { userId }, attributes: ['userId'] })

    if (!userExist) throw new AppError(Errors.USER_NOT_EXISTS)

    const createComment = await createNewEntity({
      model: db.Comment,
      data: { comment, title, commentedBy: "admin@tgt.com", role: "admin", status: true, userId }
    })

    return { createComment, success: true, message: SUCCESS_MSG.CREATE_SUCCESS }
  }
}
