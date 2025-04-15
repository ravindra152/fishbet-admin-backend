export const getReportedUserSchema = {
    query: {
        type: 'object',
        properties: {
            search: { type: 'string', transform: ['trim'] },
            pageNo: { type: ['string', 'null'] },
            limit: { type: ['string', 'null'] },
            userId: { type: 'string' },
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
                        reportedUser: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    reportCount: { type: 'number' },
                                    reportedUsers: { type: 'object' }
                                }
                            }
                        }
                    }
                },
                errors: { type: 'array' }
            }
        }
    }
}