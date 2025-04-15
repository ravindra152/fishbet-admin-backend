'use strict'

module.exports = {
  up: async (queryInterface, DataTypes) => {

    await queryInterface.createTable('wheel_division_configurations', {
      wheel_division_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      sc: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      gc: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      is_allow: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
      },
      player_limit: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      priority: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: true,
        type: DataTypes.DATE
      }
    }, {
      schema: 'public'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('wheel_division_configurations', { schema: 'public' })
  }
}
