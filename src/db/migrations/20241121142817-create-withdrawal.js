'use strict'

const { WITHDRAWAL_STATUS } = require("@src/utils/constants/public.constants")

module.exports = {
  async up(queryInterface, DataTypes) {
    // const transaction = await queryInterface.sequelize.transaction()
    await queryInterface.createTable('withdrawal_requests', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM(Object.values(WITHDRAWAL_STATUS)),
        allowNull: false,
        defaultValue: WITHDRAWAL_STATUS.PENDING
      },
      currency: { 
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'withdrawl currency'
      },
      withdrawal_address: { 
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'withdrawl wallet address of currency'
      },
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      approved_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      confirmed_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      comment: {
        type: DataTypes.STRING,
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
    }, {
      schema: 'public',
      // transaction
    })

  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('withdrawal_requests', { schema: 'public' })
  }
}
