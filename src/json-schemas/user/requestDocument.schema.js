export const requestDocumentSchema={
    body: {
        type: 'object',
        properties: {
          user: { type: 'object' },
          userId: { type: 'number' },
          reason: { type: 'string' },
          labelName: { type: 'string' },
          reRequested: { type: 'boolean' },
          documentLabelId: { type: 'number' }
        },
        required: ['documentLabelId', 'userId', 'user', 'labelName']
    }
}