export const addPaymentSettingsSchema={
    body :{
        type: 'object',
        properties: {
          action: { type: 'string' },
          providerId: { type: 'string' },
          text: { type: ['object', 'null'] },
          name: { type: ['string', 'null'] },
          fields: { type: ['array', 'null'] },
          category: { type: ['string', 'null'] },
          minDeposit: { type: ['string', 'null'] },
          maxDeposit: { type: ['string', 'null'] },
          amountKeys: { type: ['object', 'null'] },
          minWithdraw: { type: ['string', 'null'] },
          maxWithdraw: { type: ['string', 'null'] },
          depositImage: { type: ['array', 'null'] },
          withdrawImage: { type: ['array', 'null'] },
          providerName: { type: ['string', 'null'] },
          kycCountries: { type: ['array', 'null'] },
          blockedRegions: { type: ['array', 'null'] },
          logoCheck: { type: 'string', enum: ['true', 'false', 'null'] }
        },
        required: ['providerId']
    }
}