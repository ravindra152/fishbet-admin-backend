export const getAllAdminRolesSchema = {
  type: 'object',
  properties: {
    limit: {
      type: 'number'
    },
    pageNo: {
      type: 'number'
    }
  },
  required: ['limit', 'pageNo'],
}
