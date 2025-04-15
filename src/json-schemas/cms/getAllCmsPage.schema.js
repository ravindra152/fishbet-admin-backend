export const getAllCmsPageSchema={
    query: {
        type: 'object',
        properties: {
          limit: { type: ['string', 'null'] },
          pageNo: { type: ['string', 'null'] },
          search: { type: ['string', 'null'] },
          isActive: {
            type: ['string', 'null'],
            enum: ['true', 'false', '', 'null']
          },
          language: { type: ['string', 'null'] }
        }
    }
}