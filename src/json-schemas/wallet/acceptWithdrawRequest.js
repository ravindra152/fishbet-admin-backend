export const acceptWithdrawRequestSchema = {
  body: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      withdrawalId: { type: 'number' },
    },
    required: ['withdrawalId']

  }
};
