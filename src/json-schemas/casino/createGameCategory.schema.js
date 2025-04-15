export const createGameCategorySchema = {
  body: {
    type: 'object',
    properties: {
      name: { type: ['object', 'string'] },
      isActive: { type: ['boolean', 'string'] },
      imageUrl: { type: 'object' }
    },
    required: ['name', 'isActive']
  }
}