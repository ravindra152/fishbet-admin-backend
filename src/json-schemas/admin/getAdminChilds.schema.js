export const getAdminChildsSchema = {
  query: {
    type: 'object',
    properties: {
      adminRoleId: { type: 'string' },
      adminUserId: { type: ['string', 'null'] }
    },
    required: ['adminUserId']
  }
}
