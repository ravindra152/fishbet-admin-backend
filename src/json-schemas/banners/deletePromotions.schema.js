export const deletePromotionsSchema = {
  body: {
    type: 'object',
    properties: {
      promotionId: { type: ['integer', 'string'] }
    },
    required: ['promotionId']
  }
}
