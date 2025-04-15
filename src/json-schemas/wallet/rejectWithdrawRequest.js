export const rejectWithdrawRequestSchema = {
  body: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      reason: { type: 'string' },
      withdrawalId: { type: 'number' },
    },
    required: ['id', 'withdrawalId']

  }
};
