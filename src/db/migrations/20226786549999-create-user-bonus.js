'use strict'

const { BONUS_STATUS } = require("@src/utils/constants/bonus.constants")

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('user_bonuses', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Assuming you have a 'users' table
          key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      bonus_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'bonuses', // Assuming you have a 'bonuses' table
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      gc_amount: {
        type: DataTypes.DOUBLE(10, 2),
        defaultValue: 0.0
      },
      sc_amount: {
        type: DataTypes.DOUBLE(10, 2),
        defaultValue: 0.0
      },
      bonus_status: {
        type: DataTypes.ENUM(Object.values(BONUS_STATUS)),
        defaultValue: 'active'
      },
      purchase_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_bonuses')
  }
}
