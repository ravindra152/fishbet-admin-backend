export const getGroupsSchema={
    query: {
        type: 'object',
        properties: {
          limit: { type: 'string' },
          pageNo: { type: 'string' },
          search: { type: ['string', 'null'] },
          isActive: { type: ['string', 'null'] },
        }
    }
}