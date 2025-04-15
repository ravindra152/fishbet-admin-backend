export const setLossLimitSchema={
    body: {
        type: 'object',
        required: ['userId', 'lossLimit', 'timePeriod']
    }
}