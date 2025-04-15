export const addCommentSchema={
    body: {
        type: 'object',
        properties: {
          user: { type: 'object' },
          comment: { type: 'string' },
          title: { type: 'string' },
          userType: { type: 'string' },
          userId: { type: ['number', 'string', 'null'] }
        },
        required: ['comment', 'title', 'userId']
    }
}