'use strict'

module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.createTable('limits', {
      limit_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      self_exclusion_end_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      is_self_exclusion_permanent: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      self_exclusion_started_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }, { schema: 'public' })
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.dropTable('limits', { schema: 'public' })
  }
}
