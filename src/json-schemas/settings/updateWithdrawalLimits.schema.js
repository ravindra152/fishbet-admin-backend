

export const UpdatedWithdrawalLimitsSchema = {
  body: {
      type: 'object',
      properties: {
        minAmount: { type: 'number' },
        maxAmountWithoutRequest: { type: 'number' },
      },
      required: []
  }
}
