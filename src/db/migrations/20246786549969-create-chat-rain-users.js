'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('chat_rain_users', {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      chat_rain_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      win_amount: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('chat_rain_users');
  },
};
