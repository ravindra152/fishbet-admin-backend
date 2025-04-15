export const getCasinoGamesSchema={
    query:{
        type: 'object',
        properties: {
            casinoCategoryId: { // need to change to categoryId
            type: ['string', 'null']
            },
            providerId: {
            type: ['string', 'null']
            },
            freespins: {
            type: ['string', 'null'],
            enum: ['true', '', 'null']
            },
            limit: { type: ['string', 'null'] },
            pageNo: { type: ['string', 'null'] },
            search: { type: ['string', 'null'] },
            isActive: {
            type: ['string', 'null'],
            enum: ['true', 'false', '', 'null']
            },
            isFeatured: {
            type: ['string', 'null'],
            enum: ['true', 'false', '', 'null']
            },
            include: { enum: ['true', 'false'], default: 'false' },
            sort: { type: 'string', default: 'ASC' },
            orderBy: { type: 'string', default: 'casinoGameIdo' }
        },
    }
}