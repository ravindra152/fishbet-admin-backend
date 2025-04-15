// import { PROMOTIONS_TYPE } from '@src/utils/constant'

export const createPromotionsSchema = {
  body: {
    type: 'object',
    properties: {
      image: { type: 'object' },
      title: { type: ['string', 'object'] },
      content: { type: ['string', 'object'] },
      description: { type: ['string', 'object'] },
      slug: { type: 'string' },
      url: { type: 'string' },
      category: { type: 'string' }
      // category: { type: 'string', enum:Object.values(PROMOTIONS_TYPE) },
    },
    required: ['title', 'content', 'description', 'category']
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
