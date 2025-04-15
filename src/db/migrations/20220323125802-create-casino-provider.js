'use strict'

module.exports = {
  async up (queryInterface, DataTypes) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('casino_providers', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        name: {
          allowNull: true,
          type: DataTypes.JSONB
        },
        unique_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        is_active: {
          allowNull: false,
          type: DataTypes.BOOLEAN
        },
        game_aggregator_id: {
          allowNull: false,
          type: DataTypes.INTEGER,
          onDelete: 'CASCADE',
          references: {
            model: 'casino_aggregators',
            key: 'id'
          }
        },
        thumbnail_url: {
          type: DataTypes.STRING,
          allowNull: true
        },
        mobile_thumbnail_url: {
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
      },
      { schema: 'public', transaction })

      await queryInterface.addIndex('public.casino_providers', ['is_active', 'name'], {
        name: 'index_casino_providers_on_is_active_and_name', transaction
      })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.dropTable('casino_providers', { schema: 'public' })
  }
}
