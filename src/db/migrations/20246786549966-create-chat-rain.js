'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('chat_rains', {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      prize_money: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      currency_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      closed_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      // criteria: {
      //   type: DataTypes.JSONB,
      //   allowNull: true,
      //   defaultValue: {}
      // },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      player_count: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      // chat_group_id: {
      //   type: DataTypes.BIGINT,
      //   allowNull: false,
      // },
      is_closed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      }
    });
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('chat_rains');
  }
};
