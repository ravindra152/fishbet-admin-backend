'use strict'

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('bonus_drops', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      coin: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      coin_type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      total_claims_allowed: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      total_claims: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      expiry_time: {
        type: DataTypes.DATE,
        allowNull: false
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }, { schema: 'public' })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('bonus_drops', { schema: 'public' })
  }
}
