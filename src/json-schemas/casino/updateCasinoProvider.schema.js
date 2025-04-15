export const updateCasinoProviderSchema={
    body: {
        type: 'object',
        properties: {
            casinoProviderId: { type: 'string' },
            name: { type: 'string' },
            isActive: { enum: ['true', 'false'], default: 'true' },
            thumbnail: { type: ['object', 'null'] },
            demo: { type: 'string' }
        },
        required: ['casinoProviderId', 'isActive']
    }
}