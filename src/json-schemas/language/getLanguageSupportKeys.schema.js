export const getLanguageSupportKeys={
    query: {
        type: 'object',
        properties: {
          userType: { type: 'string' },
          language: { type: ['string', 'null'] },
          csvDownload: { type: ['string', 'null'] }
        },
        required: ['userType']
    }
}