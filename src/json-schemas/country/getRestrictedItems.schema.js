export const getRestrictedItemsSchema={
    query: {
        type: 'object',
        properties: {
          limit: { type: 'string' },
          pageNo: { type: 'string' },
          countryId: { type: 'string' },
          type: {
            type: 'string',
            enum: ['providers', 'games', 'Providers', 'Games', 'PROVIDERS', 'GAMES']
          },
          search: { type: ['string', 'null'] }
        },
        required: ['limit', 'pageNo', 'countryId', 'type']
    }
}