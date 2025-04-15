export const getAllPaymentProvidersSchema={
    query: {
        type: 'object',
        properties: {
          userType: { type: 'string' },
          group: { type: ['string', 'null'] },
          tenantId: { type: ['string', 'null'] },
          category: { type: ['string', 'null'] },
          tenantIds: { type: ['string', 'null'] },
          aggregator: { type: ['string', 'null'] },
          tenant: { type: 'string', enum: ['true', '', 'null'] },
          status: { type: 'string', enum: ['true', 'false', '', 'null'] },
          paymentType: { type: 'string', enum: ['deposit', 'withdraw', 'both', '', 'null'] }
        },
        required: ['userType']
    }
}