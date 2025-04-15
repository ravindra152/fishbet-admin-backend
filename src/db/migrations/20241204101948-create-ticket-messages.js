'use strict'

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('ticket_messages', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      ticket_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      is_admin_response: {
        type: DataTypes.BOOLEAN,
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

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('ticket_messages', { schema: 'public' })
  }
}
