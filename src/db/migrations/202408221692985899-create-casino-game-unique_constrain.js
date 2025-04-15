'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add unique constraint to casino_games table
    await queryInterface.addConstraint('casino_games', {
      fields: ['casino_game_id', 'casino_provider_id'], // Fields for the unique constraint
      type: 'unique', // Type of constraint
      name: 'casino_game_provider_unique' // Custom name for the constraint
    })
    
    await queryInterface.addConstraint('casino_providers', {
      fields: ['unique_id', 'game_aggregator_id'],
      type: 'unique', // Type of constraint
      name: 'casino_provider_aggregator_unique' // Custom name for the constraint
    })
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the unique constraint
    await queryInterface.removeConstraint('casino_games', 'casino_game_provider_unique')
    await queryInterface.removeConstraint('casino_providers', 'casino_provider_aggregator_unique')
  }
}
