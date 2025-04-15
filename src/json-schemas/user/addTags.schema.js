export const addTagsSchema={
    body: {
        type: 'object',
        properties: {
          userId: { type: 'number' },
          customTag: { type: 'boolean' },
          tags: { type: ['array', 'null'] },
          users: { type: ['array', 'null'] }
        },
        required: ['tags']
    }
}