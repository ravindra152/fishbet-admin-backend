export const updateCurrencySchema={
    body: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
            minLength: 3,
            maxLength: 3,
            pattern: '^[A-Z]*$'
          },
          exchangeRate: {
            type: 'string',
            maxLength: 10,
            minLength: 1
          },
          symbol: { type: 'string' },
          name: {
            type: 'string',
            maxLength: 50,
            minLength: 3,
            pattern: '^[a-zA-Z0-9 ]*$'
          },
          type: {
            type: 'number',
            enum: [0, 1]
          },
          currencyId: { type: 'number' },
          loyaltyPoint: { type: 'string' }
        },
        required: ['code', 'exchangeRate', 'symbol', 'name', 'type', 'loyaltyPoint', 'currencyId']      
    }
}