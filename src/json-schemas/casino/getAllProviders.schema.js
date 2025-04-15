export const getAllProvidersSchema={
    query: {
        type: 'object',
        properties: {
            search: { type: ['string', 'null'] },
            limit: { type: ['string', 'null'] },
            pageNo: { type: ['string', 'null'] },
            isActive: {
            enum: ['true', 'false', '', 'null']
            }
        }
    }
}