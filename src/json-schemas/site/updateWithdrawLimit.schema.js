export const updateWithdrawLimitSchema={
    body: {
        type: 'object',
        properties: {
          BTC: { type: 'number' },
          ETH: { type: 'number' },
          IDR: { type: 'object' },
          LTC: { type: 'number' },
          TRX: { type: 'number' },
          DOGE: { type: 'number' },
          USDT: { type: 'number' }
        },
        required: ['BTC', 'ETH', 'IDR', 'LTC', 'TRX', 'DOGE', 'USDT']
    }
}