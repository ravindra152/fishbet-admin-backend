export const getFreespinGamesSchema={
    query: {
        type: 'object',
        properties: {
            bonusId: { type: 'string' },
            limit: { type: ['string', 'null'] },
            pageNo: { type: ['string', 'null'] },
            search: { type: ['string', 'null'] },
            providerId: { type: ['string', 'null'] }
        },
        required: ['bonusId']
    }
}