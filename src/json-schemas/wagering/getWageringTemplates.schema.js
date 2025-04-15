export const getWageringTemplatesSchema={
    query: {
        type: 'object',
        properties: {
          limit: { type: ['string', 'null'] },
          pageNo: { type: ['string', 'null'] },
          search: { type: ['string', 'null'] }
        }
    }
}