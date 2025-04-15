import { COINS_FILTER, TRANSACTION_PURPOSE } from "@src/utils/constants/public.constants";

export const getTransactionsSchema = {
    query: {
        type: 'object',
        properties: {
            email: { type: ['string'] },
            limit: { type: ['string'] },
            userId: { type: ['string'] },
            pageNo: { type: ['string'] },
            endDate: { type: ['string'] },
            startDate: { type: ['string'] },
            currencyCode: { enum: [COINS_FILTER.GOLD_COIN, COINS_FILTER.SWEEP_COIN] },
            purpose: { enum: Object.values(TRANSACTION_PURPOSE) }
        }
    }
}