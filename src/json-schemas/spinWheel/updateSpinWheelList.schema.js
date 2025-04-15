export const updateSpinWheelListSchema = {
  body: {
    type: 'object',
    properties: {
      wheelDivisionId: { type: 'string' },
      sc: { type: ['string','number'] },
      gc: { type: ['string','number'] },
      isAllow: { type: 'boolean' },
      playerLimit: { type: ['number', 'null'] },
      priority: { type:['string','number'] }
    },
    required: ['wheelDivisionId']
  }
}
