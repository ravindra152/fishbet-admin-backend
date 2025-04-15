'use strict'

module.exports = {
  async up (queryInterface, DataTypes) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('promotions', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        title: {
          type: DataTypes.JSONB,
          allowNull: false
        },
        slug: {
          type: DataTypes.STRING,
          allowNull: false
        },
        image: {
          type: DataTypes.STRING,
          allowNull: true
        },
        mobile_image: {
          type: DataTypes.STRING,
          allowNull: true
        },
        url: {
          type: DataTypes.STRING,
          allowNull: true
        },
        description: {
          type: DataTypes.JSONB,
          allowNull: false
        },
        content: {
          type: DataTypes.JSONB,
          allowNull: false
        },
        category: {
          type: DataTypes.INTEGER,
          defaultValue: 1,
          allowNull: false
        },
        is_active: {
          type: DataTypes.BOOLEAN,
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
        transaction
      })

      await queryInterface.addIndex('public.promotions', ['title', 'is_active'], {
        name: 'index_promotions_on_title_and_is_active', transaction
      })
      await queryInterface.addIndex('public.promotions', ['slug'], {
        name: 'index_promotions_on_slug', transaction
      })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.dropTable('promotions', { schema: 'public' })
  }
}
