export const addFeaturedGamesSchema={
    body: {
        type: 'object',
        properties: {
          casinoGameId: { type: 'string' },
          isFeatured: { type: 'boolean' }
        },
        required: ['casinoGameId', 'isFeatured']
    }
}