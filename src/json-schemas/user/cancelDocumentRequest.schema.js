export const cancelDocumentRequestSchema={
    body: {
        type: 'object',
        properties: {
          userId: { type: 'number' },
          documentLabelId: { type: 'number' },
          reRequested: { type: ['boolean', 'null'] }
        },
        required: ['userId', 'documentLabelId']
    }
}