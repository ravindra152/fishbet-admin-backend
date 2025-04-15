'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    return queryInterface.bulkInsert('packages', [
      {
        amount: 49.99,
        label: 'Starter Pack',
        gc_coin: 500,
        sc_coin: 50,
        is_active: true,
        is_visible_in_store: true,
        image_url: null,
        discount_amount: 40,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('packages', null, {});
  }
};
