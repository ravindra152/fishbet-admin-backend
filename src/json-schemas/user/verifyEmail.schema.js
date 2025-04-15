export const verifyEmailSchema={
    body:{
        type: 'object',
        properties: {
          id: { type: 'number' },
          userId: { type: 'number' },
          userType: { type: 'string' }
        },
        required: ['userId', 'userType']
    }
}