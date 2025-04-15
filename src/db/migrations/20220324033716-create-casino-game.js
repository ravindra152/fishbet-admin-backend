'use strict'

module.exports = {
  async up(queryInterface, DataTypes) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('casino_games', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING
        },
        casino_game_id: {
          allowNull: true,
          type: DataTypes.STRING
        },
        casino_category_id: {
          allowNull: true,
          type: DataTypes.INTEGER,
          onDelete: 'CASCADE',
          references: {
            model: 'casino_categories',
            key: 'id'
          }
        },
        casino_provider_id: {
          allowNull: true,
          type: DataTypes.INTEGER,
          onDelete: 'CASCADE',
          references: {
            model: 'casino_providers',
            key: 'id'
          }
        },
        thumbnail_url: {
          allowNull: true,
          type: DataTypes.STRING
        },
        mobile_thumbnail_url: {
          allowNull: true,
          type: DataTypes.STRING
        },
        is_active: {
          allowNull: true,
          type: DataTypes.BOOLEAN
        },
        is_featured: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        has_freespins: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        restrictions: {
          type: DataTypes.JSONB,
          allowNull: true
        },
        devices: {
          type: DataTypes.JSONB,
          allowNull: true
        },
        return_to_player: {
          type: DataTypes.DOUBLE,
          allowNull: true
        },
        wagering_contribution: {
          type: DataTypes.DOUBLE,
          defaultValue: 100
        },
        more_details: {
          type: DataTypes.JSONB,
          allowNull: true
        },
        order_id: {
          allowNull: true,
          type: DataTypes.INTEGER
        },
        demo: {
          type: DataTypes.BOOLEAN,
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
      },
        { schema: 'public', transaction })

      await queryInterface.addIndex('public.casino_games', ['casino_game_id', 'id'], { transaction })
      await queryInterface.addIndex('public.casino_games', ['is_active', 'casino_game_id'], {
        name: 'index_casino_games_on_is_active_and_casino_game_id', transaction
      })
      await queryInterface.addIndex('public.casino_games', ['is_active', 'casino_category_id'], {
        name: 'index_casino_games_on_is_active_and_casino_category_id', transaction
      })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('casino_games', { schema: 'public' })
  }
}
