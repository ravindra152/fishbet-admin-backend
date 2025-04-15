'use strict'

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('currencies', {
      code: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
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
    await queryInterface.dropTable('currencies', { schema: 'public' })
  }
}
