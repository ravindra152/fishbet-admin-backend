export const updateCmsPageSchema={
  body: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        slug: {
          type: 'string',
          pattern: '^[a-zA-Z0-9-_#]*$'
        },
        content: { type: 'string' },
        category: { type: ['number', 'string'] },
        cmsPageId: { type: ['number', 'string'] },
        isActive: { type: 'boolean' },
        adminUserId: { type: ['string', 'null'] }
      },
      required: ['cmsPageId']
  }
}