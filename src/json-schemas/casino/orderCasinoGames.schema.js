export const orderCasinoGamesSchema={
    body: {
        type: 'object',
        properties: {
          order: { type: 'array' },
          categoryId: { type: 'number' }
        },
        required: ['order', 'categoryId']
    }
}