import { Op } from 'sequelize'
import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { pageValidation } from '@src/utils/common'

// const schema = {
//   type: 'object',
//   properties: {
//     limit: { type: ['string', 'null'] },
//     pageNo: { type: ['string', 'null'] },
//     search: { type: ['string', 'null'] }
//   }
// }

// 

export class GetPromotionsHandler extends BaseHandler {
  // get constraints () {
  //   return constraints
  // }

  async run() {
    let { limit, pageNo, search } = this.args

    const query = {}
    const { page, size } = pageValidation(pageNo, limit)

    if (search) {
      // search = search.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_')

      //   query = {
      //     title: {
      //       EN: {
      //         [Op.iLike]: `%${search}%`
      //       }
      //     }
      //   }
      // }
      //   query = {
      //     title: {
      //       EN: {
      //         [Op.iLike]: `%${search}%`
      //       }
      //     }
      //   }
      // }
      query[`title.EN`] = { [Op.like]: `%${search}%` }
    }

    const promotions = await db.Promotions.findAndCountAll({
      where: query,
      limit: size,
      offset: ((page - 1) * size),
      order: [['createdAt', 'DESC']]
    })

    return { promotions }
  }
}
