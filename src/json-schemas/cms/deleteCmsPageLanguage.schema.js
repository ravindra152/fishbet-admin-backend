export const deleteCmsPageLanguageSchema={
    body: {
        type: 'object',
        properties: {
          language: { type: 'string' },
          cmsPageId: { type: 'number' }
        },
        required: ['cmsPageId', 'language']
    }
}