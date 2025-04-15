'use strict'

module.exports = {
  async up(queryInterface, DataTypes) {

    await queryInterface.createTable('vip_tiers', {

      vip_tier_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      level: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      wagering_threshold: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      games_played: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      big_bets_threshold: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      big_bet_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      deposits_threshold: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      login_streak: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      referrals_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      // sweepstakes_entries: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      // sweepstakes_wins: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      time_based_consistency: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false
      }
    }, {
      schema: 'public',
    })
    await queryInterface.addIndex('vip_tiers', ['level'], {
      name: 'index_vip_tiers_on_level',
    })
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('vip_tiers', { schema: 'public' })
  }
}
