export const createAdminRoleSchema = {
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        enum: ['Super Admin', 'Admin', 'Manager', 'Support']
      },
      permission: { type: 'object' },
      level: { type: 'integer', minimum: 1 }
    },
    required: ['name', 'permission', 'level']
  }
}
