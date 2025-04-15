'use strict';

const { MESSAGE_STATUS, MESSAGE_TYPE } = require("@src/utils/constants/chat.constants");

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('messages', {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      actionee_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      chat_rain_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      // message_binary: {
      //   type: DataTypes.TEXT,
      //   allowNull: true
      // },
      status: {
        type: DataTypes.ENUM(Object.values(MESSAGE_STATUS)),
        allowNull: false,
        defaultValue: MESSAGE_STATUS.ACTIVE
      },
      is_contain_offensive_word: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      is_private: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      chat_group_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      message_type: {
        type: DataTypes.ENUM(Object.values(MESSAGE_TYPE)),
        defaultValue: MESSAGE_TYPE.MESSAGE
      },
      // shared_event: {
      //   type: DataTypes.JSONB,
      //   allowNull: true,
      //   defaultValue: {}
      // },
      // reply_message_id: {
      //   type: DataTypes.BIGINT,
      //   allowNull: true
      // },
      tip_id: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('messages');
  }
};
