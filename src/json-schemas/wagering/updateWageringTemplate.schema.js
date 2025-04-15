export const updateWageringTemplateSchema={
    body: {
        type: 'object',
        properties: {
          name: { type: ['string', 'null'] },
          wageringTemplateId: { type: 'integer' },
          gameContribution: { type: ['object', 'null'] }
        },
        required: ['wageringTemplateId']
    }
}