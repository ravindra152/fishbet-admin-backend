export const updateCasinoGameSchema = {
    body: {
        type: 'object',
        properties: {
            casinoGameId: { type: 'string' },
            casinoProviderId: { type: 'string' },
            casinoCategoryId: { type: 'string' },
            name: { type: 'string' },
            devices: { type: 'string' },
            // moreDetails: { type: 'string' },
            isActive: { type: ['string', 'boolean'] },
            description: { type: ['string'] },
            hasFreespins: { type: ['string'] },
        },
        required: ['casinoGameId']
    }
}