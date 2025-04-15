export const setDisableUntilSchema={
    body: {
        type: 'object',
        properties: {
          days: { type: 'number' },
          userId: { type: 'string' },
          reset: { type: 'boolean' },
          portal: { type: 'string', enum: ['current', 'all'] },
          type: { type: 'string', enum: ['TAKE_A_BREAK', 'SELF_EXCLUSION'] }
        },
        required: ['userType', 'userId', 'type', 'portal']
    }
}