export const getNotificationSchema = {
  query: {
    type: 'object',
    properties: {
      limit: { type: ['string', 'null'] },
      pageNo: { type: ['string', 'null'] },
      search: { type: ['string', 'null'] }
    }
  }
}
