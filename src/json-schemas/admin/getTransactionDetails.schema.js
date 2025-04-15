export const getTransactionDetailsSchema = {
  query: {
    type: 'object',
    properties: {
      sort: { type: 'string' },
      limit: { type: 'string' },
      pageNo: { type: ['string', 'null'] },
      userId: { type: ['string', 'null'] },
      endDate: { type: ['string', 'null'] },
      orderBy: { type: ['string', 'null'] },
      startDate: { type: ['string', 'null'] },
      currencyCode: { type: ['string', 'null'] },
      transactionId: { type: ['string', 'null'] },
      paymentProvider: { type: ['string', 'null'] },
      status: { type: ['string', 'null'], enum: ['0', '1', '2', '3', ''] },
      csvDownload: { type: ['string', 'null'], enum: ['true', 'false'] },
      transactionType: {
        type: ['string', 'null'],
        enum: ['deposit', 'withdraw', 'bonus', 'bonusToCash', 'bonusForfeit', 'bonusExpired', 'bonusZeroedOut', '', null,
          'all', 'addMoney', 'removeMoney', 'addMoneyInternal', 'removeMoneyInternal', 'depositInternal', 'withdrawInternal', 'commision', 'bonusReferral']
      }
    }
  }
}
