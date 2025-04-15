export const deleteAdminRoleSchema = {
  querystring: {
    type: 'object',
    properties: {
      roleId: { type: 'integer', minimum: 1 }
    },
    required: ['roleId']
  }
}
