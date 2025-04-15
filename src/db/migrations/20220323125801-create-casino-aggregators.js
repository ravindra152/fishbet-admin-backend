'use strict'

module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.createTable('casino_aggregators', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.JSONB
      },
      is_active: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    { schema: 'public' })
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.dropTable('casino_aggregators', { schema: 'public' })
  }
}
