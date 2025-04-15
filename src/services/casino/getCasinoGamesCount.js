import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'

const schema = {
  type: 'object',
  properties: {
    providerId: {
      type: 'array', default: []
    },
    casinoSubCategoryId: {
      type: 'array', default: []
    },
    isActive: {
      type: ['string', 'null'],
      enum: ['true', 'false', '', 'null']
    }
  },
  required: []
}



export class GetCasinoGamesCountHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run() {
    let { isActive, casinoSubCategoryId, providerId } = this.args;

    let count, query
    query = {}

    if (isActive || isActive == false) query = { ...query, isActive }
    if (providerId?.length) query = { ...query, casinoProviderId: providerId }
    if (casinoSubCategoryId?.length) { query = { ...query, casinoCategoryId: casinoSubCategoryId } }

    count = await db.CasinoGame.count({ where: query, group: ['casinoProviderId', 'casinoCategoryId'] })

    return { count, message: SUCCESS_MSG.GET_SUCCESS }
  }

  catch (error) {
    this.addError('InternalServerErrorType', error)
  }
}
