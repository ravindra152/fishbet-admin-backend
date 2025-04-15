'use strict'

const { DEVICE_TYPE, BANNER_TYPE } = require("@src/utils/constants/public.constants")

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable(
      'banners',
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
        },
        title: {
          type: DataTypes.JSONB,
          allowNull: false,
          defaultValue: {}
        },
        description: {
          type: DataTypes.JSONB,
          allowNull: false,
          defaultValue: {}
        },
        image_url: {
          type: DataTypes.STRING(255),
          allowNull: false
        },
        mobile_image_url: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        redirect_url: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        banner_type: {
          type: DataTypes.ENUM(Object.values(BANNER_TYPE)),
          allowNull: false
        },
        // device_type: {
        //   type: DataTypes.ENUM(Object.values(DEVICE_TYPE)),
        //   allowNull: false
        // },
        order: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW
        }
      },
      {
        schema: 'public'
      }
    )
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('banners', { schema: 'public' })
  }
}
