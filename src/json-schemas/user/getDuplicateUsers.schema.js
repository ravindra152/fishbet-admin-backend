export const getDuplicateUsersSchema={
    query:{
        type: 'object',
        properties: {
          user: { type: 'object' },
          limit: { type: 'string' },
          pageNo: { type: 'string' },
          userId: { type: 'string' }
        },
        required: ['userId']
    }
}