export const deleteCategoryGameSchema={
    body: {
        type: 'object',
        properties: {
          casinoGameId: { type: 'number' }
        },
        required: ['casinoGameId']
    }
}