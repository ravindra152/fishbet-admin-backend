'use strict';

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.createTable('packages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: 0.0
      },
      label: {
        type: DataTypes.STRING,
        allowNull: false
      },
      gc_coin: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
      },
      sc_coin: {
        type: DataTypes.DOUBLE,
        defaultValue: 0
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      is_visible_in_store: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      discount_amount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.dropTable('packages');
  }
};
