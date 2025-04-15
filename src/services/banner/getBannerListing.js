import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { pageValidation } from '@src/utils/common'

// const schema = {
//   type: 'object',
//   properties: {
//     limit: { type: ['string', 'null'] },
//     pageNo: { type: ['string', 'null'] },
//     isActive: { type: ['string'] }
//   }
// }

// 

export class GetBannerHandler extends BaseHandler {
  // get constraints () {
  //   return constraints
  // }

  async run () {
    const { limit, pageNo, isActive, bannerType } = this.args

    const { page, size } = pageValidation(pageNo, limit)
    let query
    if (isActive) query = { isActive }

    if (bannerType) query = { ...query, bannerType }

    const banners = await db.Banner.findAndCountAll({
      where: { ...query },
      limit: size,
      offset: ((page - 1) * size),
      order: [['createdAt', 'DESC']]
    })

    return { banners }
  }
}
