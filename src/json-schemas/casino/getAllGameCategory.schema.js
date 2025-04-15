export const GetAllGameCategorySchema={
    query:{
        type: 'object',
        properties: {
            limit: { type: ['string', 'null'] },
            pageNo: { type: ['string', 'null'] },
            search: { type: ['string', 'null'] },
            isActive: {
            type: ['string', 'null'],
            enum: ['true', 'false', '', 'null']
            }
        }
    }
}