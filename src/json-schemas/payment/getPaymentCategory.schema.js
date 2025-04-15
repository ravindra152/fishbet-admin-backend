export const getPaymentCategorySchema={
    query: {
        type: 'object',
        properties: {
          paymentType: { type: 'string', enum: ['deposit', 'withdraw'] }
        },
        required: ['paymentType']
    }
}