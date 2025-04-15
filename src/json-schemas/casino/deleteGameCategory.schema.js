export const deleteGameCategorySchema={
    body: {
        type: 'object',
        properties: {
          gameCategoryId: { type: 'number' }
        },
        required: ['gameCategoryId']
    }
}