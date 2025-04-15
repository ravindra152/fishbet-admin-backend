'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('reported_users', {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      actionee_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      reported_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      group_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_unblocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    await queryInterface.dropTable('reported_users');
  },
};
