'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('chat_rules', {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      rules: {
        type: DataTypes.TEXT,
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
    await queryInterface.dropTable('chat_rules');
  },
};
