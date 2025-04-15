export const getAffiliateCommisionGroupSchema = {
  query: {
    type: 'object',
    properties: {
      limit: { type: ['string', 'null'], default: 10 },
      pageNo: { type: ['string', 'null'], default: 1 },
      commisionGroupId: { type: ['string', 'null'] },
      isActive: { type: 'boolean' },
      groupName: { type: 'string' }
    }
  }
}
