export const affiliateRequestSchema = {
  query: {
    type: 'object',
    properties: {
      limit: {
        type: ['string', 'null']
      },
      pageNo: {
        type: ['string', 'null']
      },
      startDate: {
        type: ['string', 'null']
      },
      endDate: {
        type: ['string', 'null']
      },
      status: {
        type: ['string', 'null'], enum: ['PENDING', 'APPROVED', 'REJECTED', 'REREQUESTED', '']
      },
      search: {
        type: ['string', 'null']
      }
    }
  }
}
