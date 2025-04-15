export const updateGroupSchema={
    body: {
        type: 'object',
        properties: {
          groupId: { type: 'number' },
          name: { type: 'object' },
          isActive: { type: 'boolean' }
        },
        required: ['name']
    }
}