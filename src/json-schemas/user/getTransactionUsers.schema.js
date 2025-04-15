export const getTransactionUsersSchema={
    query:{
        type: 'object',
        properties: {
          id: { type: 'number' },
          type: { type: 'string' },
          user: { type: 'object' },
          userType: { type: 'string' },
          email: { type: ['string', 'null'], minLength: 3 }
        },
        required: ['userType', 'id', 'type']
    }
}