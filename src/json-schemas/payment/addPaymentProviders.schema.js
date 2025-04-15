export const addPaymentProvidersSchema={
    body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          aggregator: { type: 'string' },
          group: { type: ['string', 'null'] },
          supportsDeposit: { type: 'boolean' },
          gateway: { type: ['string', 'null'] },
          supportsWithdrawal: { type: 'boolean' },
          requiredFields: { type: ['array', 'null'] },
          regionsSupported: { type: ['object', 'null'] }
        },
        required: ['name', 'aggregator', 'supportsDeposit', 'supportsWithdrawal']
    }
}