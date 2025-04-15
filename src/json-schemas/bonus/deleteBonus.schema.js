export const deleteBonusScheam = {
  body: {
    type: 'object',
    properties: {
      user: { type: 'object' },
      bonusId: { type: 'number' }
    },
    required: ['user', 'bonusId']
  }
}
