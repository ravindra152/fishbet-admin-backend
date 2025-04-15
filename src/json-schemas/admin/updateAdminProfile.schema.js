export const updateAdminProfileSchema = {
  body: {
    type: 'object',
    properties: {
      id: { type: 'number' },
      firstName: {
        type: 'string',
        minLength: 3,
        maxLength: 50,
        pattern: '^[a-zA-Z0-9]*$'
      },
      lastName: {
        type: 'string',
        minLength: 3,
        maxLength: 50,
        pattern: '^[a-zA-Z0-9 ]*$'
      },
      phone: { type: 'string' },
      email: {
        type: 'string',
        maxLength: 150,
        format: 'email'
      },
      adminUsername: {
        type: 'string',
        minLength: 3,
        maxLength: 50,
        pattern: '^[a-zA-Z0-9_@./#&+-]*$'
      }
    },
    required: ['id', 'email', 'lastName', 'firstName', 'user']
  }
}
