export const getUserCashbackSchema={
    query: {
        type: 'object',
        properties: {
          level: { type: 'string' },
          userId: { type: 'string' },
          currencyCode: { type: 'string' }
        },
        required: ['userId', 'level', 'currencyCode']
    }
}