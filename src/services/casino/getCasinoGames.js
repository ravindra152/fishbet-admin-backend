import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { filterByName, pageValidation } from '@src/utils/common'
import { SUCCESS_MSG } from '@src/utils/success'
import { Op } from 'sequelize'
// import config from '@src/configs/app.config'

const schema = {
  type: 'object',
  properties: {
    casinoCategoryId: { // need to change to categoryId
      type: ['string', 'null']
    },
    providerId: {
      type: ['string', 'null']
    },
    freespins: {
      type: ['string', 'null'],
      enum: ['true', '', 'null']
    },
    limit: { type: ['string', 'null'] },
    pageNo: { type: ['string', 'null'] },
    search: { type: ['string', 'null'] },
    isActive: {
      type: ['string', 'null'],
      enum: ['true', 'false', '', 'null']
    },
    isFeatured: {
      type: ['string', 'null'],
      enum: ['true', 'false', '', 'null']
    },
    include: { enum: ['true', 'false'], default: 'false' },
    sort: { type: 'string', default: 'ASC' },
    orderBy: { type: 'string', default: 'casinoGameIdo' }
  }
}



export class GetCasinoGamesHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run() {
    let {
      limit, pageNo, isActive, search, casinoCategoryId, providerId, sort, orderBy, isFeatured, freespins, include
    } = this.args

    let query = {}

    const { page, size } = pageValidation(pageNo, limit)

    if (search) query = filterByName(query, search)
    if (isActive && (isActive !== '' || isActive !== null)) query = { ...query, isActive: JSON.parse(isActive) }
    if (isFeatured) query = { ...query, isFeatured: JSON.parse(isFeatured) }

    if (providerId) query = { ...query, casinoProviderId: providerId }
    if (casinoCategoryId) {
      // if (include === 'false') query = { ...query, casinoCategoryId: { [Op.not]: casinoCategoryId } }
      // else
      query = { ...query, casinoCategoryId: casinoCategoryId }
      orderBy = 'orderId'
    }
    if (freespins) {
      query = { ...query, hasFreespins: true }
    }

    console.log(query, 'Final Query Object')
    const casinoGames = await db.CasinoGame.findAndCountAll({
      where: query,
      attributes: ['id', 'orderId', 'casinoGameId', 'casinoCategoryId', 'hasFreespins', 'casinoProviderId', 'returnToPlayer',
        'wageringContribution', 'isActive', 'isFeatured', 'name', 'thumbnailUrl', 'devices',
        'moreDetails'],
      include: [
        {
          model: db.CasinoProvider, attributes: ['name'], required: false
        },
        { model: db.CasinoCategory, required: false }
      ],
      // order: [[orderBy, sort]],
      limit: size,
      offset: ((page - 1) * size)
    })

    if (!casinoGames) throw new AppError(Errors.GAME_NOT_FOUND)

    return { casinoGames, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
