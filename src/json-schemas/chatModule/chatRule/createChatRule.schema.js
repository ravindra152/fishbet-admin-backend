export const createChatRuleSchema = {
    body: {
        type: 'object',
        properties: {
            rule: { type: 'string' }
        },
        required: ['rule']
    },
    response: {
        200: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        newChatRules: {},
                        message: { type: 'string' }
                    }
                },
                errors: { type: 'array' }
            }
        }
    }
}