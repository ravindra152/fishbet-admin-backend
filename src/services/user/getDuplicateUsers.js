import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { getOne } from '@src/services/helper/crud'
import { pageValidation } from '@src/utils/common'
import { SUCCESS_MSG } from '@src/utils/success'
import { Op } from 'sequelize'


export class GetDuplicateUsersHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const { limit, pageNo, userId } = this.args

    const data = { userId }
    const { page, size } = pageValidation(pageNo, limit)

    const userDetail = await getOne({
      model: db.User,
      data: data,
      attributes: ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'username', 'userId']
    })

    if (!userDetail) throw new AppError(Errors.USER_NOT_EXISTS)

    let emailName = userDetail.email?.split('@')[0]
    emailName = emailName?.split('+')[0]
    const query = {
      [Op.or]: [
        { firstName: { [Op.iLike]: `%${userDetail.firstName}%` } },
        { lastName: { [Op.iLike]: `%${userDetail.lastName}%` } },
        { email: { [Op.iLike]: `%${emailName}%` } },
        { phone: { [Op.like]: userDetail.phone ? userDetail.phone : ' ' } },
        { dateOfBirth: { [Op.eq]: userDetail.dateOfBirth } },
        { username: { [Op.iLike]: `%${userDetail.username}%` } }
      ],
      userId: { [Op.ne]: userDetail.userId }
    }

    const users = await db.User.findAndCountAll({
      where: query,
      limit: size,
      offset: ((page - 1) * size),
      attributes: ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'username', 'userId']
    })

    return { users, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
