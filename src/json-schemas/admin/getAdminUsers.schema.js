export const getAdminUsersSchema = {
  query: {
    type: 'object',
    properties: {
      userType: { type: 'string' },
      sort: { type: ['string', 'null'], enum: ['ASC', 'DESC'] },
      limit: { type: ['string', 'null'], pattern: '^[0-9]+$' },
      pageNo: { type: ['string', 'null'], pattern: '^[0-9]+$' },
      search: { type: ['string', 'null'] },
      status: { type: ['string', 'null'] },
      orderBy: { type: ['string', 'null'] },
    },
    // required: ['userType'],
  },
  body: {
    type: 'object',
    properties: {
      id: { type: 'number' },
      user: { type: ['object', 'null'] },
    },
    required: ['id'],
  },
}
