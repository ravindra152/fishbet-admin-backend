export const updateLanguageSupportKeysSchema={
    body: {
        type: 'object',
        properties: {
          data: { type: 'object' },
          userType: { type: 'string' },
          type: {
            type: 'string',
            enum: ['key', 'language', 'create']
          }
        },
        required: ['userType', 'data', 'type']
    }
}