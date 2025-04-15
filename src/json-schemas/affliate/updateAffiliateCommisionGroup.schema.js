import { ACCEPTANCE_PERIOD } from '@src/utils/constants/affiliate.constants'

export const updateAffiliateCommisionSchema={
    body: {
        type: 'object',
        properties: {
            commisionGroupId: { type: 'string' },
            groupName: { type: 'string' },
            minimumDownline: { type: 'number' },
            acceptancePeriod: { type: 'string', enum: Object.values(ACCEPTANCE_PERIOD) },
            percentage: { type: 'number' },
            calculationInterval: { type: 'string' },
            termAndConditions: { type: 'object' },
            description: { type: 'object' }
        },
        required: ['groupName', 'minimumDownline', 'acceptancePeriod', 'percentage']
    }
}
