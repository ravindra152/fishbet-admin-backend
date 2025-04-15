'use strict'

module.exports = {
  async up (queryInterface, DataTypes) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('casino_categories', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        name: {
          allowNull: false,
          type: DataTypes.JSONB
        },
        image_url: {
          type: DataTypes.STRING,
          allowNull: true
        },
        mobile_image_url: {
          type: DataTypes.STRING,
          allowNull: true
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        order_id: {
          type: DataTypes.INTEGER,
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
      },
      { schema: 'public', transaction })

      await queryInterface.addIndex('public.casino_categories', ['name', 'is_active'], {
        name: 'index_casino_categories_on_name_and_is_active', transaction
      })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface) {
    await queryInterface.dropTable('casino_categories', { schema: 'public' })
  }
}
