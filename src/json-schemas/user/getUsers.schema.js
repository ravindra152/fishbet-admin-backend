export const getUsersSchema={
    query: {
        type: 'object',
        properties: {
          user: { type: 'object' },
          limit: { type: 'string' },
          pageNo: { type: 'string' },
          search: { type: ['string', 'null'] },
          isInternal: { type: ['boolean', 'null'] },
          isActive: { type: ['string', 'null'] },
          affiliateStatus: { type: ['string', 'null'] },
          groupId: { type: ['string', 'null'] },
          userId: { type: ['string', 'null'] },
          phoneNumber: { type: ['string', 'null'] },
          sort: { type: ['string', 'null'] },
          orderBy: { type: ['string', 'null'] },
          kycStatus: { type: ['string', 'null'], enum: ['APPROVED', 'PENDING', 'REJECTED', 'REQUESTED', 'RE_REQUESTED', '', 'INIT', 'COMPLETED', 'ONHOLD'] },
          loggedIn: { type: ['string', 'null'] },
          countryCode: { type: ['string', 'null'] },
          refParentId: { type: ['string', 'null'] },
          level: { type: ['string', 'null'], enum: ['1', '2', '3', '4', '5', ''] },
          affiliateId: { type: ['string', 'null'] },
          startDate: {
            type: ['string', 'null']
          },
          endDate: {
            type: ['string', 'null']
          }
        },
        // required: ['']
    }
}