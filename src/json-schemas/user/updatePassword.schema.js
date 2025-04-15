export const updatePasswordSchema={
    body: {
        type: 'object',
        properties: {
          userId: { type: 'number' },
          password: { type: 'string', format: 'password' }
        },
        required: ['userId', 'password']
    }
}