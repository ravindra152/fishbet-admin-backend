export const deleteRestrictedItemsSchema={
    body: {
        type: 'object',
        properties: {
          itemIds: { type: 'array' },
          countryId: { type: 'number' },
          type: {
            type: 'string',
            enum: ['providers', 'games', 'Providers', 'Games', 'PROVIDERS', 'GAMES']
          }
        },
        required: ['itemIds', 'type', 'countryId']
    }
}