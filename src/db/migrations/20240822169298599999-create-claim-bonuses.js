'use strict'

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('bonus_claims', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      bonus_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'bonus_drops',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      claim_coin: {
        type: DataTypes.INTEGER,
        allowNull: false
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

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('bonus_claims', { schema: 'public' })
  }
}
