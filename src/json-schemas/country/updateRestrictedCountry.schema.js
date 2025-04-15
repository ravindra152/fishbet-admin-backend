export const updateRestrictedCountrySchema={
    body: {
        type: 'object',
        properties: {
          itemIds: { type: 'array' },
          countryId: { type: 'string' },
          type: {
            type: 'string',
            enum: ['providers', 'games', 'Providers', 'Games', 'PROVIDERS', 'GAMES']
          }
        },
        required: ['itemIds', 'type', 'countryId']
    }
}