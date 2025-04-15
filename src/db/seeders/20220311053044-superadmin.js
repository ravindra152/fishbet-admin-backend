'use strict'

const { permissions } = require("@src/utils/constants/staffManagement.constants")

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.bulkInsert('admin_users', [{
      first_name: 'Tgt',
      last_name: 'admin',
      email: 'superadmin@trueigtech.com',
      password: '$2b$12$GUcThczmOUCuhcIjbrpl2u.yvvfSw0jdP2uCvQCEQN2rQwFpuC3Gu',
      admin_role_id: 1,
      is_active: true,
      permission: JSON.stringify(permissions),
      admin_username: 'tgt_admin',
      created_at: new Date(),
      updated_at: new Date()
    }])
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.bulkDelete('admin_users', null, {})
  }
}
