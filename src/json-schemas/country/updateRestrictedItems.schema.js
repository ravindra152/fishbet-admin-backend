export const updateRestrictedItemsSchema={
    body: {
        type: 'object',
        properties: {
          itemId: { type: 'number' },
          countryIds: { type: 'array' },
          type: {
            type: 'string',
            enum: ['providers', 'games', 'Providers', 'Games', 'PROVIDERS', 'GAMES']
          }
        },
        required: ['itemId', 'type', 'countryIds']
    }
}