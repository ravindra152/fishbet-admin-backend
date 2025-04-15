export const getVipTierDetailsSchema = {
  query: {
    type: 'object',
    properties: {
      vipTierId: { type: 'string' },
    },
    required: ['vipTierId'],
  },
};
