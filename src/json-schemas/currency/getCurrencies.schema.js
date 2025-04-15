export const getCurrenciesSchema={
    query: {
        type: 'object',
        properties: {
          limit: { type: 'string' },
          pageNo: { type: 'string' }
        },
        required: ['limit', 'pageNo']
    }
}