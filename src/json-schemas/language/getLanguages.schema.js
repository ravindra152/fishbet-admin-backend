export const getLanguagesSchema={
    query: {
        type: 'object',
        properties: {
          name: { type: ['string', 'null'] },
          limit: { type: ['string', 'null'] },
          pageNo: { type: ['string', 'null'] }
        }
    }
}