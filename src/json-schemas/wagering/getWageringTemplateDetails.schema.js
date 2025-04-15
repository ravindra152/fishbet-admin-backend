export const getWageringTemplateDetailsSchema={
    query: {
        type: 'object',
        properties: {
          limit: { type: ['string', 'null'] },
          pageNo: { type: ['string', 'null'] },
          search: { type: ['string', 'null'] },
          wageringTemplateId: { type: 'string' },
          providerId: { type: ['string', 'null'] }
        },
        required: ['wageringTemplateId']
    }
}