'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('tips', {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recipient_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      currency_id: {
        type: DataTypes.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('tips');
  }
};
