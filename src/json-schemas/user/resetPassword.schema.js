export const resetPasswordSchema={
    body: {
        type: 'object',
        properties: {
          userId: { type: 'number' }
        },
        required: ['userId']
    }
}