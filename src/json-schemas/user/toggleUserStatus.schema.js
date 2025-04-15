export const toggleStatusSchema = {
  body: {
    type: 'object',
    properties: {
      userId: { type: ['string', 'number'] }
    },
    required: ['userId']
  }
}
