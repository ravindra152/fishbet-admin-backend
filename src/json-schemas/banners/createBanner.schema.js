export const createBannerSchema = {
  body: {
    type: 'object',
    properties: {
      banners: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            bannerType: { type: 'string' },
            deviceType: { type: 'string', enum: ['MOBILE', 'DESKTOP'] }, // Device type validation
            title: { type: 'object' }, // Assuming localization { "en": "Title", "es": "Título" }
            description: { type: 'object' },
            order: { type: ['number', 'string'] },
            redirectUrl: { type: 'string' }
          },
          required: ['bannerType', 'deviceType', 'title'] // Removed `image` from required fields
        }
      }
    },
    required: ['banners']
  }
}
