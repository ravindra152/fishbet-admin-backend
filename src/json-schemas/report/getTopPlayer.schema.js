
export const getTopPlayerSchema = {
  query: {
    type: 'object',
    properties: {
      orderDirection: { enum: ['ASC', 'DESC'] },
      orderBy: {
        enum: ['bet_count', 'win_count', 'total_sc_wagered', 'total_sc_won', 'total_sc_purchased', 'total_sc_redeemed']
      },
      userId: { type: 'string' },
      search: { type: 'string' },
      page: { type: 'string' }, // Page number
      pageSize: { type: 'string' } // Page size
    }
  }
}
