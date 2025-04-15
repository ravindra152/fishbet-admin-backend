export const updateStatusSchema = {
  body: {
    type: 'object',
    properties: {
      adminUserId: { type: ['string', 'number'] }
    },
    required: ['adminUserId']
  }
}
