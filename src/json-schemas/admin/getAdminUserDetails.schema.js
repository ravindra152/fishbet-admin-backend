export const getAdminUserDetailsSchema = {
  query: {
    type: 'object',
    properties: {
      adminUserId: { type: ['string', 'number'] }
    }
  },
  body: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  },
}
