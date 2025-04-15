export const createGroupSchema={
    body: {
        type: 'object',
        properties: {
          name: { type: 'object' },
          isActive: { type: 'boolean', default: true }
        },
        required: ['name']
    }
}