'use strict'

const { TRANSACTION_STATUS } = require("@src/utils/constant")
const { CASINO_ROUND_STATUS } = require("@src/utils/constants/casino.constants")
const { CASINO_TRANSACTION_PURPOSE } = require("@src/utils/constants/public.constants")

module.exports = {
  async up (queryInterface, DataTypes) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('casino_transactions', {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'user_id'
          }
        },
        transaction_id: {
          type: DataTypes.STRING,
          defaultValue: DataTypes.UUIDV4
        },
        casino_game_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'casino_games',
            key: 'id'
          }
        },
        game_round_id: {
          type: DataTypes.STRING,
          allowNull: true
        },
        action_type: {
          type: DataTypes.ENUM(Object.values(CASINO_TRANSACTION_PURPOSE)),
        },
        status: {
          type: DataTypes.ENUM(Object.values(TRANSACTION_STATUS)),
          defaultValue: TRANSACTION_STATUS.PENDING
        },
        round_status: {
          type: DataTypes.ENUM(Object.values(CASINO_ROUND_STATUS)),
          allowNull: true,
        },
        more_details: {
          type: DataTypes.JSONB,
          allowNull: true
        },
        created_at: {
          allowNull: false,
          type: DataTypes.DATE
        },
        updated_at: {
          allowNull: false,
          type: DataTypes.DATE
        }
      }, { schema: 'public', transaction })

      await queryInterface.addIndex('public.casino_transactions', ['action_type', 'status', 'user_id'], {
        name: 'index_casino_transaction_on_action_type_and_status_and_user_id', transaction
      })
      await transaction.commit()
    } catch (error) {
      console.log(error)
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.dropTable('casino_transactions', { schema: 'public' })
  }
}
