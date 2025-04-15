export const updateAffiliatePercentageGloballySchema={
    body: {
        type: 'object',
        properties: {
          affiliatePercentage: { type: 'number' }
        },
        required: ['affiliatePercentage']
    }
}