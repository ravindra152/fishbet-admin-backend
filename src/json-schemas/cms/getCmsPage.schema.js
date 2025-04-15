export const getCmsPageSchema = {
  query: {
    type: 'object',
    properties: {
      cmsPageId: {
        type: 'string',
        pattern: '^[0-9]+$'
      }
    },
    required: ['cmsPageId']
  }
}