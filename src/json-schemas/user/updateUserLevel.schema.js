export const updateUserLevelSchema={
    body: {
        type: 'object',
        properties: {
          userId: { type: 'number' },
          level: { type: 'number', enum: [1, 2, 3, 4, 5] },
          status: { type: 'boolean' }
        },
        required: ['userId', 'level', 'status']
    }
}