import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { filterByDateCreatedAt, filterByNameEmail, pageValidation } from '@src/utils/common'
import { SUCCESS_MSG } from '@src/utils/success'
import { serverDayjs } from '@src/libs/dayjs'


export class GetUserDocumentHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const { limit, pageNo, userId, startDate, endDate, search, status } = this.args

    let query = {}, searchByUserName

    const { page, size } = pageValidation(pageNo, limit)
    // if (startDate || endDate) query = filterByDateCreatedAt(query, startDate, endDate, 'UserDocument')
    // if (startDate && endDate) {
    //   startDate = serverDayjs(startDate).startOf('day').toISOString()
    //   endDate = serverDayjs(endDate).endOf('day').toISOString()
    // }

    if (search) searchByUserName = filterByNameEmail(query, search, 'User')
    if (status !== undefined) query = { ...query, status }
    if (userId) query = { ...query, userId }
    if (startDate && endDate) {
      query = {
        ...query, createdAt: {
          [db.Sequelize.Op.gte]: serverDayjs(startDate).startOf('day').toDate(),
          [db.Sequelize.Op.lte]: serverDayjs(endDate).endOf('day').toDate()
        }
      }
    } else if (startDate) {
      query = {
        ...query, createdAt: {
          [db.Sequelize.Op.gte]: serverDayjs(startDate).startOf('day').toDate()
        }
      }
    } else if (endDate) {
      query = {
        ...query, createdAt: {
          [db.Sequelize.Op.lte]: serverDayjs(endDate).endOf('day').toDate()
        }
      }
    }

    const userDocument = await db.UserDocument.findAndCountAll({
      where: query || {},
      order: [['createdAt', 'DESC']],
      limit: size,
      offset: ((page - 1) * size),
      include: {
        model: db.User,
        where: searchByUserName,
        attributes: ['username', 'email']
      }
    })

    return { userDocument, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
