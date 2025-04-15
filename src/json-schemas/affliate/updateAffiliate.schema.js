export const updateAffliateSchema = {
  body: {
    type: 'object',
    properties: {
      userId: { type: 'number' },
      status: { type: 'string', enum: ['true', 'false'] },
      reason: { type: 'string' },
      id: { type: 'number' },
      commisionGroupId: { type: 'number' }
    },
    required: ['userId', 'status']
  }
}
