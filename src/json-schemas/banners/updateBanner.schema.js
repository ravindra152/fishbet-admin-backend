export const updateBannerSchema = {
  body: {
    type: 'object',
    properties: {
      bannerId: { type: 'string' },
      bannerType: { type: 'string' },
      title: { type: 'object' },
      description: { type: 'object' },
      redirectUrl: { type: 'string' },
      order: { type: ['number', 'string'] }
    },
    required: ['bannerId']
  }
}
