export const addAffiliateSchema = {
  body: {
    type: 'object',
    properties: {
      userId: { type: 'number' },
      commisionId: { type: 'number' }
    },
    required: ['userId', 'commisionId']
  }
}
