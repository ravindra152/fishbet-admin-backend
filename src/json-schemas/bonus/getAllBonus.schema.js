import { BONUS_TYPE } from '@src/utils/constants/bonus.constants'

export const getAllBunusSchema={
    query :{
        type: 'object',
        properties: {
          bonusId: { type: ['string', 'null'] },
          limit: { type: ['string', 'null'], default: '10' },
          search: { type: ['string', 'null'] },
          pageNo: { type: ['string', 'null'], default: '1' },
          bonusType: { enum: Object.values(BONUS_TYPE) }
        }
    }
}
