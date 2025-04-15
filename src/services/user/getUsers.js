import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { filterByDateCreatedAt, filterByNameEmail, pageValidation } from '@src/utils/common'
import { SUCCESS_MSG } from '@src/utils/success'
import { Op } from 'sequelize'


export class GetUsersHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    let {
      limit, pageNo, search, isActive, kycStatus, affiliateStatus, groupId,
      isInternal, userId, phoneNumber, sort, orderBy, loggedIn, countryCode, refParentId, level, affiliateId, startDate, endDate
    } = this.args
    let query, newQuery

    const { page, size } = pageValidation(pageNo, limit)
    if (isInternal) query = { ...query, isInternalUser: isInternal }
    if (!sort || sort === '') sort = 'DESC'
    if (!orderBy || orderBy === '') orderBy = 'createdAt'
    if (search) query = filterByNameEmail(query, search, 'User')
    if (userId) query = { ...query, userId }
    if (phoneNumber) query = { ...query, phone: { [Op.substring]: phoneNumber } }
    if (affiliateStatus === 'true' || affiliateStatus === 'false') query = { ...query, affiliateStatus }
    if (isActive === 'true' || isActive === 'false') query = { ...query, isActive }
    if (refParentId) query = { ...query, refParentId }
    if (startDate || endDate) query = filterByDateCreatedAt(query, startDate, endDate, 'User')
      
      const users = await db.User.findAndCountAll({
        where: query,
        order: [[orderBy, sort]],
        limit: size,
        offset: ((page - 1) * size),
        include: [
          {
            model: db.User,
            as: 'referrer',
            attributes: ['username'],
          }
        ]
      })

    if (!users) throw new AppError(Errors.USER_NOT_EXISTS)

    return { users, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
