'use strict'
import { BANNER_TYPE, DEVICE_TYPE } from '@src/utils/constants/public.constants'

module.exports = (sequelize, DataTypes) => {
  const Banner = sequelize.define('Banner', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: DataTypes.JSONB, // Supports multiple languages
      allowNull: false,
      defaultValue: {}
    },
    description: {
      type: DataTypes.JSONB, // Supports multiple languages
      allowNull: false,
      defaultValue: {}
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    mobileImageUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    redirectUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    bannerType: {
      type: DataTypes.ENUM(Object.values(BANNER_TYPE)), // Mobile/Desktop
      allowNull: false
    },
    // deviceType: {
    //   type: DataTypes.ENUM(Object.values(DEVICE_TYPE)), // Enum: MOBILE, DESKTOP
    //   allowNull: false
    // },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    tableName: 'banners',
    schema: 'public',
    timestamps: true,
    underscored: true
  })

  Banner.associate = function (models) {
    // Future associations (e.g., linking banners to campaigns, user groups)
  }

  return Banner
}
