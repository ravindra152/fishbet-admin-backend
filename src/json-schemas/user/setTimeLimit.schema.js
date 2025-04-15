export const setTimeLimitSchema={
    body: {
        type: 'object',
        required: ['userId', 'timeLimit']
    }
}