export const createWageringTemplateSchema={
    body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          gameContribution: { type: 'object' }
        },
        required: ['name', 'gameContribution']
    }
}