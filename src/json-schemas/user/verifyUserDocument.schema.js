export const verifyUserDocumentSchema={
    body: {
        type: 'object',
        properties: {
          user: { type: 'object' },
          userId: { type: 'number' },
          reason: { type: 'string' },
          userDocumentId: { type: 'number' },
          status: { type: 'string', enum: ['approved', 'rejected'] }
        },
        required: ['userId', 'userDocumentId', 'status', 'user']
    }
}