export const uploadImageGallerySchema={
    body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          image: { type: 'object' }
        },
        // required: ['name', 'image']
    }
}