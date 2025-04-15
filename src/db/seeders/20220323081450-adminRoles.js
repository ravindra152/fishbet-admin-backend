'use strict'

const { permissions, ROLE_DETAILS } = require("@src/utils/constants/staffManagement.constants")

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert({ tableName: 'admin_roles', schema: 'public' }, [
      {
        name: ROLE_DETAILS.SUPERADMIN.NAME,
        level: ROLE_DETAILS.SUPERADMIN.LEVEL,
        created_at: new Date(),
        updated_at: new Date(),
        permission: JSON.stringify(permissions),
      },
      {
        name: ROLE_DETAILS.ADMIN.NAME,
        level: ROLE_DETAILS.ADMIN.LEVEL,
        created_at: new Date(),
        updated_at: new Date(),
        permission: JSON.stringify(permissions),
      },
      {
        name: ROLE_DETAILS.MANAGER.NAME,
        level: ROLE_DETAILS.MANAGER.LEVEL,
        created_at: new Date(),
        updated_at: new Date(),
        permission: JSON.stringify(permissions),
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'admin_roles', schema: 'public' }, null, {})
  }
}
