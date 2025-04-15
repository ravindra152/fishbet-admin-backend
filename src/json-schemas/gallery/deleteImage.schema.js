export const deleteImageSchema={
    body: {
        type: 'object',
        properties: {
          imageUrl: { type: 'string' }
        },
        required: ['imageUrl']
    }
}