export const getAggregatorsSchema={
    query: {
        type: 'object',
        properties: {
            limit: { type: 'string' },
            pageNo: { type: 'string' }
        }
    }
}