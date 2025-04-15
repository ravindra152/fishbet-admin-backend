import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { filterByNameEmailGroup, pageValidation } from '@src/utils/common'
import { SUCCESS_MSG } from '@src/utils/success'

export class GetAdminUsersHandler extends BaseHandler {
  async run() {
    const { id, pageNo, limit, orderBy = 'firstName', search, status, sort = 'ASC', userType, user, } = this.args

    let query = {}
    // if (userType) query.parentType = userType
    if (search) query = filterByNameEmailGroup(query, search)
    if (status) query.isActive = status

    const options = {
      where: query,
      order: [[orderBy, sort.toUpperCase()]],
      attributes: ['adminUserId', 'firstName', 'lastName', 'phone', 'email', 'adminRoleId', 'isActive', 'adminUsername', 'group',],
      include: {
        attributes: ['name'],
        model: db.AdminRole
      }
    }

    if (pageNo && limit) {
      const { page, size } = pageValidation(pageNo, limit)
      options.limit = size
      options.offset = (page - 1) * size
    }

    const adminDetails = await db.AdminUser.findAndCountAll(options)

    return { adminDetails }
  }
}
