export const assignGroupSchema={
    body: { 
        type: 'object',
        properties: {
          userId: { type: 'number' },
          groupId: { type: 'number' }
        },
        required: ['userId', 'groupId']
    }
}