// import { PROMOTIONS_TYPE } from '@src/utils/constant'

export const getReferredSchema = {
  query: {
    type: 'object',
    properties: {
      userId: { type: ['string', 'number'] },
      limit: {
        type: ['string', 'null']
      },
      pageNo: {
        type: ['string', 'null']
      },
      startDate: {
        type: ['string', 'null']
      },
      endDate: {
        type: ['string', 'null']
      },
      search: {
        type: ['string', 'null']
      }
    },
    required: ['userId']
  }
  // response: {
  //   200: {
  //     type: 'object',
  //     properties: {
  //       data: { $ref: '#/definitions/data' },
  //       errors: { type: 'array' }
  //     }
  //   }
  // }
}
