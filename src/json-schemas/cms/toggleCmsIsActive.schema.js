export const toggleCmsIsActiveSchema = {
  body: {
    type: 'object',
    properties: {
      cmsPageId: {
        type: ['number','string'],
        pattern: '^[0-9]+$'
      },
      status:{
        type: 'boolean'
      },
      code: {
        type: 'string'
      }
    },
    required: ['cmsPageId']
  }
}
