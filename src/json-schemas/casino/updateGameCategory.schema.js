export const updateGameCategorySchema = {
    body: {
        type: 'object',
        properties: {
            name: { type: ['object', 'string'] },
            casinoCategoryId: { type: 'string' },
            isActive: { type: ['boolean', 'string'] },
            web: { type: 'object' },
            mobile: { type: 'object' }
        },
        required: ['casinoCategoryId']
    }
}