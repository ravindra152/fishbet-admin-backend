'use strict'

// ES5 Import
const { TICKET_STATUSES } = require("@src/utils/constants/public.constants");

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('tickets', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subject: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM(Object.values(TICKET_STATUSES)),
        allowNull: false,
        defaultValue: TICKET_STATUSES.OPEN
      },
      // prioriy: {
      //   type: DataTypes.TEXT,
      //   allowNull: true
      // },
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
    await queryInterface.dropTable('tickets', { schema: 'public' })
  }
}
