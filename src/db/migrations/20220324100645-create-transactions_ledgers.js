'use strict'

const { LEDGER_TYPES, LEDGER_TRANSACTION_TYPES } = require("@src/utils/constants/public.constants")

module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.createTable('transaction_ledgers', {
      ledger_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      transaction_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      transaction_type: {
        type: DataTypes.ENUM(Object.values(LEDGER_TRANSACTION_TYPES)),
        allowNull: false
      },
      wallet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'wallets',
          key: 'id'
        }
      },
      currency_code: {
        type: DataTypes.STRING({ length: 3 }),
        allowNull: false,
        references: {
          model: 'currencies',
          key: 'code'
        },
        validate: {
          len: [3, 3] // Ensure the length is exactly 3 characters
        }
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      direction: {
        type: DataTypes.ENUM(Object.values(LEDGER_TYPES)),
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

  async down (queryInterface, DataTypes) {
    await queryInterface.dropTable('transaction_ledgers', { schema: 'public' })
  }
}
