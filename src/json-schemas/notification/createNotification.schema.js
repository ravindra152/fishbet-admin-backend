export const createNotificationSchema = {
    body: {
        type: 'object',
        properties: {
            title: { type: ['object', 'string'] },
            content: { type: ['object', 'string'] }
        },
        required: ['title', 'content']
    }
}
