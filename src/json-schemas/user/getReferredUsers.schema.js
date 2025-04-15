export const getReferredUsersSchema={
    query: {
        type: 'object',
        properties: {
          userId: { type: ['number', 'string'] },
          limit: { type: ['string', 'null'] },
          pageNo: { type: ['string', 'null'] },
          startDate: { type: ['string', 'null'] },
          endDate: { type: ['string', 'null'] },
          search: { type: ['string', 'null'] }
        },
        required: ['userId']
    }
}