export const deleteTagsSchema={
    body: {
        type: 'object',
        properties: {
          tags: { type: 'array' },
          userId: { type: 'number' }
        },
        required: ['userId', 'tags']
    }
}