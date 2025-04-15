import { ACCEPTANCE_PERIOD } from '@src/utils/constants/affiliate.constants'

export const createAffiliateCommisionGroupSchema={
    body: {
        type: 'object',
        properties: {
            groupName: { type: 'string' },
            minimumDownline: { type: 'number' },
            acceptancePeriod: { type: 'string', enum: Object.values(ACCEPTANCE_PERIOD) },
            percentage: { type: 'number' },
            calculationInterval: { type: 'string' },
            termAndConditions: { type: 'object' },
            description: { type: 'object' },
            image: { type: 'object' },
        },
        required: ['groupName', 'minimumDownline', 'acceptancePeriod', 'percentage']
    }
}
