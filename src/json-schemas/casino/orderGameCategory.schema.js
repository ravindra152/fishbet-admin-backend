export const orderGameCategorySchema={
    body: {
        type: 'object',
        properties: {
          order: { type: 'array' },
        },
        required: ['order']
    }
}