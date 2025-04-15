'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('user_affiliations', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      affiliate_user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        comment: 'User ID of the affiliate (referrer)',
      },
      referred_user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        comment: 'User ID of the referred user',
      },
      earned_commission: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0,
        comment: 'Total earned commission by the affiliate',
      },
      wagered_amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0,
        comment: 'Total amount wagered by the referred user',
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        comment: 'Indicates whether the affiliation is active',
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_affiliations');
  },
};
