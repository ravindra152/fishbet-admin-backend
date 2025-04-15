import { TRANSACTION_PURPOSE } from "@src/utils/constants/public.constants";

export const manageWaletSchema = {
  body: {
    type: 'object',
    properties: {
      userId: { type: 'string' },
      amount: { type: 'number', minimum: 0.1 },
      currencyCode: { type: 'string' },
      purpose: { enum: Object.values(TRANSACTION_PURPOSE) }
    },
    // required: ['userId', 'addAmount', 'walletType', 'user']
    required: ['userId', 'amount', 'currencyCode']
  }
}
