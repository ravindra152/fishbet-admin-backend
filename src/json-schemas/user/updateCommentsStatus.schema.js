export const updateCommentsStatusSchema = {
  body: {
    type: 'object',
    properties: {
      user: { type: 'object' },
      userId: { type: ['number', 'string', 'null'] },
      commentId: { type: ['number', 'string', 'null'] },
      status: { type: ['string', 'boolean'] }
    },
    required: ['userId', 'status']
  }
}