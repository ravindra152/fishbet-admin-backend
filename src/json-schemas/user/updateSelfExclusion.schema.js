export const updateSelfExclusionSchema = {
  body: {
    type: 'object',
    properties: {
      userId: { type: 'number' },
      days: { type: 'number', default: 10 },
      removeSelfExclusion: { type: 'boolean' },
      type: { type: ['string', 'null'] },
      permanent: { type: 'boolean', default: false },
      selfExclusion: { type: ['string', 'null'] }
    },
    required: ['userId']
  }
}


