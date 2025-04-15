'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('chat_groups', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: ''
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      group_logo: {
        type: DataTypes.STRING,
        allowNull: true
      },
      admins: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: []
      },
      criteria: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {}
      },
      is_global: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      }
    });
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('chat_groups');
  }
};
