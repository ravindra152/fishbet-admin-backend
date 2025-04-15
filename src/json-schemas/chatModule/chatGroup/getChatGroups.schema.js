export const getChatGroupsSchema = {
    query: {
        type: 'object',
        properties: {
            search: { type: 'string', transform: ['trim'] },
            pageNo: { type: ['string', 'null'] },
            limit: { type: ['string', 'null'] },
            status: { type: 'string', enum: ['true', 'false'] },
            startDate: { type: 'string' },
            endDate: { type: 'string' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        groups: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    chatGroupId: { type: 'number' },
                                    name: { type: 'string' },
                                    description: { type: 'string' },
                                    status: { type: 'boolean' },
                                    groupLogo: { type: 'string' },
                                    criteria: { type: 'array' },
                                    isGlobal: { type: 'boolean' },
                                }
                            }
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