export const updateAdminRoleSchema = {
  body: {
    type: 'object',
    properties: {
      roleId: { type: 'integer', minimum: 1 },
      name: { type: ['string', 'null'] },
      permission: { type: ['object', 'null'] },
      level: { type: ['integer', 'null'], minimum: 1 }
    },
    required: ['roleId']
  }
}
