export const getUserDocumentSchema={
    query: {
        type: 'object',
        properties: {
          user: { type: 'object' },
          userId: { type: 'string' },
          limit: { type: ['string', 'null'] },
          pageNo: {
            type: ['string', 'null']
          },
          startDate: {
            type: ['string', 'null']
          },
          endDate: {
            type: ['string', 'null']
          },
          search: {
            type: ['string', 'null']
          },
          status: {
            type: ['string', 'null']
          }
        }
    }
}