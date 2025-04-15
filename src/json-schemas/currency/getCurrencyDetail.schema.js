export const getCurrencyDetailSchema={
    query: {
        type: 'object',
        properties: {
          currencyId: { type: 'string' }
        },
        required: ['currencyId']
    }
}