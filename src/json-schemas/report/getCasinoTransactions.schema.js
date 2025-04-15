import { CASINO_TRANSACTION_PURPOSE, COINS } from "@src/utils/constants/public.constants";

export const getCasinoTransactionsSchema = {
  query: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      limit: { type: 'string' },
      userId: { type: 'string' },
      pageNo: { type: 'string' },
      endDate: { type: 'string' },
      startDate: { type: 'string' },
      gameName: { type: 'string' },
      currencyCode: { enum: [COINS.GOLD_COIN, COINS.SWEEP_COIN.BONUS_SWEEP_COIN, COINS.SWEEP_COIN.PURCHASE_SWEEP_COIN, COINS.SWEEP_COIN.REDEEMABLE_SWEEP_COIN] },
      purpose: { enum: Object.values(CASINO_TRANSACTION_PURPOSE) }
    }
  }
}
