export const createDropBonusSchema = {
    type: 'object',
    properties: {
        coin: { type: 'integer' },
        name: { type: 'string' },
        coinType: { type: 'string' },
        isActive: { type: 'boolean' },
        totalClaimsAllowed: { type: 'integer' },
        totalClaims: { type: 'integer' },
        expiryTime: { type: 'string', format: 'date-time' },  // Expecting UTC format
    },
    required: ['coin', 'name', 'coinType', 'totalClaimsAllowed', 'totalClaims', 'expiryTime']
}