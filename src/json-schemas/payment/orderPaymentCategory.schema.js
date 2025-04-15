export const orderPaymentCategory={
    body: {
        type: 'object',
        properties: {
          order: { type: 'array' },
          paymentType: { type: 'string', enum: ['deposit', 'withdraw'] }
        },
        required: ['order', 'paymentType']
    }
}