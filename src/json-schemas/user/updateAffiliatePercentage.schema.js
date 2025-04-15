export const updateAffiliatePercentageSchema={
    body: {
        type: 'object',
        properties: {
          userId: { type: 'number' },
          affiliatePercentage: { type: 'number' }
        },
        required: ['userId', 'affiliatePercentage']
    }
}