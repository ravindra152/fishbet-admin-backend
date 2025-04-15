export const setDepositLimitSchema={
    body: {
        type: 'object',
        required: ['userId', 'depositLimit', 'timePeriod']
    }
}