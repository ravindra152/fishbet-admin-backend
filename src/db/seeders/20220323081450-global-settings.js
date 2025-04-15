'use strict'

const { GLOBAL_SETTING } = require("@src/utils/constant")

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert({ tableName: 'global_settings', schema: 'public' }, [
      {
        key: 'ADMIN_GALLERY',
        value: JSON.stringify([]),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        key: 'SITE_INFORMATION',
        value: JSON.stringify([]),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        key: GLOBAL_SETTING.FAUCET_SETTING,
        value: JSON.stringify({
          SC: 1,
          GC: 100,
          interval: 24
        }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        key: GLOBAL_SETTING.WITHDRAWAL_LIMITS,
        value: JSON.stringify({
          minAmount: 30
        }),
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'global_settings', schema: 'public' }, null, {})
  }
}
