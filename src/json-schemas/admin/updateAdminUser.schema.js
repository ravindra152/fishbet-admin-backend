export const updateAdminUserSchema = {
  body: {
    type: 'object',
    properties: {
      adminUserId: { type: 'number' },
      user: {type : 'object'},
      id : {type: 'integer'},
      firstName: {
        type: 'string',
        minLength: 3,
        maxLength: 50
      },
      lastName: {
        type: 'string',
        minLength: 3,
        maxLength: 50
      },
      email: {
        type: 'string',
        maxLength: 150,
        format: 'email'
      },
      group: { type: 'string' },
      permission: { type: 'object' },
      isActive : {type : 'boolean'},
      adminUsername: {
        type: 'string',
        minLength: 3,
        maxLength: 50,
        pattern: '^[a-zA-Z0-9_@./#&+-]*$'
      }
    },
    required: ['id', 'user','adminUserId', 'firstName', 'lastName', 'email', 'adminUsername', 'permission']
  }
}
