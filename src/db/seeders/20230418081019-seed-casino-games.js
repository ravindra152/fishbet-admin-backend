'use strict'
import { seedGames } from 'scripts/seedGames'

module.exports = {
  async up (queryInterface, DataTypes) {
    // await seedGames()
  },

  async down (queryInterface, DataTypes) {
    // await queryInterface.bulkDelete('languages', null, {})
  }
}
