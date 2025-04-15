export const getCountryListSchema={
    query: {
        type: 'object',
        properties: {
          search: { type: ['string', 'null'] },
          limit: { type: ['string', 'null'] },
          pageNo: { type: ['string', 'null'] },
          kycMethod: { type: ['string', 'null'] },
          status: { type: ['string', 'null'] }
        }
    }
}