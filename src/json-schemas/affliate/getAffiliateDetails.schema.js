export const getAffiliateDetailsSchema = {
  query: {
    type: 'object',
    properties: {
      id: { type: 'number' },
      user: { type: 'object' },
      userType: { type: 'string' },
      affiliateId: { type: 'string' }
    },
    required: ['id', 'user', 'userType', 'affiliateId']
  }
}
