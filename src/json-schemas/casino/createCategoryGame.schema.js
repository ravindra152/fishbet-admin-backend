export const createCategoryGameSchema={
    body: {
        type: 'object',
        properties: {
          games: { type: 'array' },
          categoryId: { type: 'number' }
        },
        required: ['games', 'categoryId']
    }
}