'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.bulkInsert('chat_groups', [
      {
        name: 'GLOBAL',
        description: 'This is the global group accessible to all users',
        status: true,
        group_logo: null,
        criteria: JSON.stringify({}),
        is_global: true,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.bulkDelete('chat_groups', null, {});
  }
};