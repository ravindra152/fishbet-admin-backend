'use strict'

module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.createTable('admin_roles', {
      role_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      permission: {
        type: DataTypes.JSONB,
        allowNull: false
      },
      level: {
        type: DataTypes.SMALLINT,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }, { schema: 'public' })
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.dropTable('admin_roles', { schema: 'public' })
  }
}
