'use strict'

module.exports = {
  async up (queryInterface, DataTypes) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('favorite_games', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        casino_game_id: {
          allowNull: false,
          type: DataTypes.INTEGER
        },
        user_id: {
          allowNull: false,
          type: DataTypes.INTEGER
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

      await queryInterface.addIndex('public.favorite_games', ['casino_game_id'], {
        name: 'index_favorite_games_on_casino_game_id', transaction
      })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.dropTable('favorite_games', { schema: 'public' })
  }
}
