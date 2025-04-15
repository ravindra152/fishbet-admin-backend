export const deleteBannerSchema = {
  body: {
    type: 'object',
    properties: {
      bannerId: { type: ['string', 'number'] }
    },
    required: ['bannerId']
  }
}
