export const getAllEmailTemplateSchema={
    query: {
        type: 'object',
        properties: {
          emailTemplateId: { type: 'string' }
        },
        required: ['emailTemplateId']
    }
}