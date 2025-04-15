// import { PROMOTIONS_TYPE } from '@src/utils/constant'

export const updatePromotionsSchema = {
  body: {
    type: 'object',
    properties: {
      promotionId: { type: ['integer', 'string'] },
      image: { type: ['string', 'object'] },
      title: { type: ['string', 'object'] },
      content: { type: ['string', 'object'] },
      description: { type: ['string', 'object'] },
      slug: { type: 'string' },
      url: { type: 'string' },
      category: { type: 'string' },
      isActive: { type: ['boolean', 'string'] }
      // category: { type: 'string', enum:Object.values(PROMOTIONS_TYPE) },
    },
    required: ['promotionId']
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
