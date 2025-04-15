export const getOffensiveWordsSchema = {
    query: {
        type: 'object',
        properties: {
            search: { type: 'string', transform: ['trim'] },
            pageNo: { type: ['string', 'null'] },
            limit: { type: ['string', 'null'] },
            startDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        offensiveWords: {
                            type: 'array',
                            items: {}
                        },
                        page: { type: 'number' },
                        totalPage: { type: 'number' }
                    }
                },
                errors: { type: 'array' }
            }
        }
    }
}