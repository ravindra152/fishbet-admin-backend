export const getBonusDetailsSchema = {
  query: {
    type: 'object',
    properties: {
      bonusId: { type: 'string' },
      userBonusId: { type: ['string', 'null'] }
    },
    required: ['bonusId']
  }
}
