export const getBannerSchema = {
  query: {
    type: 'object',
    properties: {
      limit: { type: ['string', 'null'] },
      pageNo: { type: ['string', 'null'] },
      isActive: { type: ['string'] },
      bannerType: { type: ['string']}
    }
  }
}
