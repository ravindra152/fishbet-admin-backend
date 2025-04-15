export const getProviderBetDetailsSchema={
    query: {
        type: 'object',
        properties: {
          startDate: { type: ['string', 'null'] },
          endDate: { type: ['string', 'null'] },
          currency: { type: ['string', 'null'] },
          casinoProviderId: { type: ['string', 'null'] }
        }
    }
}