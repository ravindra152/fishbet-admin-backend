import { BONUS_STATUS } from '@src/utils/constants/bonus.constants'

export const createBonusSchema = {
    body: {
        type: 'object',
        properties: {
            //   bonusId: {
            //     type: 'string'
            //   }, // Bonus ID to update
            promotionTitle: { type: 'string' },
            bonusImage: { type: 'object' },
            gcAmount: { type: 'string' },
            scAmount: { type: 'string' },
            promoCode: { type: 'string' },
            bonusType: { type: 'string' },
            isAmountInPercentage: { type: 'string' },
            minDeposit: { type: 'string' },
            minWagerAmount: { type: 'string' },
            eligibleGames: { type: 'object' }, // Can be a JSON array of game IDs
            maxBonusLimit: { type: 'string' },
            wagerMultiplier: { type: 'string' },
            referralCode: { type: 'string' },
            daysToClear: { type: 'string' },
            status: {
                type: 'string',
                enum: Object.values(BONUS_STATUS) // Ensure this matches your defined BONUS_STATUS
            },
            description: { type: 'string' },
            termsConditions: { type: 'string' }
        },
        // required: ['bonusId', 'bonusType', 'promotionTitle']
        required: ['promotionTitle', 'bonusImage', 'gcAmount', 'scAmount', 'bonusType']
    }
}
