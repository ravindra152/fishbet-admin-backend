import { GRADUAL_LOSS_PERIOD_UNITS } from '@src/utils/constants/public.constants';

export const updateVipTierSchema = {
  body: {
    type: 'object',
    properties: {
      vipTierId: { type: ['number', 'string'] },
      name: { type: 'string' },
      icon: { type: 'object' },
      level: { type: ['number', 'string'] },
      wageringThreshold: { type: ['number', 'string'] },
      gamesPlayed: { type: ['number', 'string'] },
      bigBetsThreshold: { type: ['number', 'string'] },
      bigBetAmount: { type: ['number', 'string'] },
      depositsThreshold: { type: ['number', 'string'] },
      loginStreak: { type: ['number', 'string'] },
      referralsCount: { type: ['number', 'string'] },
      // sweepstakesEntries: { type: 'string' },
      // sweepstakesWins: { type: 'string' },
      timeBasedConsistency: { type: ['number', 'string'] },
      isActive: {
        type: ['boolean', 'string'],
      },
      // rewards: { type: 'object' },
      rewards: {
        type: 'array',
        items: { type: 'object' } // This specifies that rewards is an array of objects
      },
    },
    required: [
      'vipTierId'
    ]
  },
};
