'use strict'

const { BONUS_TYPE, BONUS_STATUS } = require("@src/utils/constants/bonus.constants")

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('bonuses', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      bonus_type: {
        type: DataTypes.ENUM(Object.values(BONUS_TYPE)),
        allowNull: false
      },
      promotion_title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      gc_amount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0
      },
      sc_amount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0
      },
      day: {
        type: DataTypes.INTEGER,
        allowNull: true // For daily Bonus
      },
      percentage: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true // applicable for purchase bonuses
      },
      max_bonus_limit: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true // for deposit bonuses
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true // optional for bonus image
      },
      status: {
        type: DataTypes.ENUM(Object.values(BONUS_STATUS)),
        defaultValue: BONUS_STATUS.ACTIVE
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true // optional for further bonus details
      },
      terms_conditions: {
        type: DataTypes.TEXT,
        allowNull: true // store specific terms for each bonus
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('bonuses')
  }
}
