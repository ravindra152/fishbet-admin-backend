'use strict'

// ES5 Import
const { TRANSACTION_PURPOSE } = require("@src/utils/constants/public.constants");
const { TRANSACTION_STATUS, PAYMENT_PROVIDER } = require("@src/utils/constant");
const { WALLET_OWNER_TYPES } = require("@src/utils/constants/public.constants");

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('transactions', {
      transaction_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id'
        }
      },
      payment_provider_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      payment_provider: {
        type: DataTypes.ENUM(Object.values(PAYMENT_PROVIDER)),
        allowNull: true
      },
      withdrawal_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        refrences: {
          model: 'withdrawal_requests',
          key: 'id'
      }
      },
      purpose: {
        type: DataTypes.ENUM(Object.values(TRANSACTION_PURPOSE)),
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM(Object.values(TRANSACTION_STATUS)),
        defaultValue: TRANSACTION_STATUS.PENDING,
        allowNull: true
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
    }, { schema: 'public' });
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('transactions', { schema: 'public' });
  }
}
