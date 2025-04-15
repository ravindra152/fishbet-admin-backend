export const setDailyLimitSchema={
    body: {
        type: 'object',
        required: ['userId', 'currencyCode', 'dailyLimit', 'timePeriod']
    }
}