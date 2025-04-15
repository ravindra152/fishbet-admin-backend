export const getPaymentProviderSchema={
    query: {
        type: 'object',
        properties: {
          providerId: { type: 'string' }
        },
        required: ['providerId']
    }
}