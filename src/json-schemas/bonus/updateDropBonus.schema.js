export const updateDropBonusSchema = {
    type: 'object',
    properties: {
        coin: { type: 'integer' },
        bonusId: { type: 'string' },
        isActive: { type: 'boolean' },
        totalClaimsAllowed: { type: 'integer' },
        expiryTime: { type: 'string', format: 'date-time' },  // Expecting UTC format
    },
    required: ['bonusId']
}