export const getAllWithdrawRequestSchema={
    query: {
        type: 'object',
        properties: {
          limit: { type: 'string' },
          pageNo: { type: 'string' },
          search: { type: ['string', 'null'] },
          endDate: { type: ['string', 'null'] },
          startDate: { type: ['string', 'null'] },
          status: { type: ['string'] }
        }
    }
}
