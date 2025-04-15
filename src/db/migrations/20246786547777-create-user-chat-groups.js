'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('user_chat_groups', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      chat_group_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      banned_till: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('user_chat_groups');
  }
};
