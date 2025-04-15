'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('offensive_words', {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      word: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('offensive_words');
  },
};
