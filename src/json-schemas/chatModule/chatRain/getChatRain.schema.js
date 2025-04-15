export const getChatRainSchema = {
    query: {
        type: 'object',
        properties: {
            search: { type: 'string', transform: ['trim'] },
            pageNo: { type: ['string', 'null'] },
            limit: { type: ['string', 'null'] },
            status: { type: 'string' },
            startDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date' },
            groupId: { type: 'string' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        chatRains: {
                            type: 'array',
                            items: {}
                        },
                        page: { type: 'number' },
                        totalPages: { type: 'number' }
                    }
                },
                errors: { type: 'array' }
            }
        }
    }
}