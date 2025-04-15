export const getCommentsSchema={
    query: {
        type: 'object',
        properties: {
          userId: { type: ['number', 'string'] },
          limit: { type: ['string', 'null'] },
          pageNo: { type: ['string', 'null'] },
          search: { type: ['string', 'null'] },
          status: {
            type: ['string', 'null'],
            enum: ['true', 'false', '', 'null']
          },
          role: { type: ['string', 'null'] }
        },
        required: ['userId']
    }
}