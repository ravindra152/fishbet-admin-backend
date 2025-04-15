export const setUserInternalSchema={
    body: {
        type: 'object',
        properties: {
          userId: { type: ['number', 'string'] },
          userInternalStatus: { type: 'boolean' }
        },
        required: ['userId']
    }
}