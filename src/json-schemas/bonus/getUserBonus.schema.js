import { BONUS_TYPE, USER_BONUS_STATUS_VALUES } from '@src/utils/constants/bonus.constants'


export const getUserBonusSchema={
    query: {
        type: 'object',
        properties: {
            limit: { type: 'string' },
            pageNo: { type: 'string' },
            userId: { type: 'string' },
            bonusId: { type: 'string' },
            bonusType: {
            type: ['string', 'null'],
            enum: [ ...Object.values(BONUS_TYPE), '']
            },
            status: {
            type: ['string', 'null'],
            enum: [ ...Object.values(USER_BONUS_STATUS_VALUES), '']
            }
        },
        required: ['limit', 'pageNo']
    }
}
