'use strict'

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('notifications', {

      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: DataTypes.JSONB,
        allowNull: false
      },
      content: {
        type: DataTypes.JSONB,
        allowNull: false
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }, {
      schema: 'public'
    })
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('notifications', { schema: 'public' })
  }
}