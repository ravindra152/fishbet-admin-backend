'use strict'

module.exports = {
  async up(queryInterface, DataTypes) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('states', {
        state_code: {
          primaryKey: true,
          type: DataTypes.STRING,
          allowNull: false
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          defaultValue: true
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false
        }
      }, {
        schema: 'public',
        transaction
      })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('states', { schema: 'public' })
  }
}
