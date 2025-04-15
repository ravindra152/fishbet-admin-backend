import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { filterByTitleCommentEmail, pageValidation } from '@src/utils/common'
import { SUCCESS_MSG } from '@src/utils/success'


export class GetAllCommentsPageHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const { limit, pageNo, search, status, userId, role } = this.args

    const { page, size } = pageValidation(pageNo, limit)
    let query = { userId }
    if (search) query = filterByTitleCommentEmail(query, search)
    if (status && (status !== '' || status !== null)) query = { ...query, status }
    if (role === 'superadmin' || role === 'admin') query = { ...query, role }

    const comment = await db.Comment.findAndCountAll({
      order: [['createdAt', 'DESC']],
      where: query,
      limit: size,
      offset: ((page - 1) * size)
    })

    if (!comment) throw new AppError(Errors.COMMENT_NOT_FOUND)

    return { comment, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
