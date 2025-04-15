export const addBannerTextSchema={
    body: {
        type: 'object',
        properties: {
          userId: { type: 'string' },
          data: { type: 'object' }
        },
        required: ['userId', 'data']
    }
}