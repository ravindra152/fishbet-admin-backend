export const deactivateAffiliateUserSchema = {
  body: {
    type: 'object',
    properties: {
      userId: { type: 'number' },
      status: { type: 'boolean' }
    },
    required: ['userId', 'status']
  }
}
