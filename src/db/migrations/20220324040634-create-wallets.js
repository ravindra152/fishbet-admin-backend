'use strict'

module.exports = {
  async up(queryInterface, DataTypes) {
    const transaction = await queryInterface.sequelize.transaction()
    await queryInterface.createTable('wallets', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      currency_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
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
      schema: 'public'
    })

  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('wallets', { schema: 'public' })
  }
}
