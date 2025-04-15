export const updateSiteInfoSchema = {
  body: {
    type: 'object',
    properties: {
      name: { type: ['string', 'null'] },
      url: { type: ['string', 'null'] },
      supportEmail: { type: ['string', 'null'] },
      lang: { type: ['string', 'null'] },
      maintenance: { type: ['string', 'null'] }
    }
  }
}
