'use strict'

module.exports = {
  async up (queryInterface, DataTypes) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('user_groups', {
        id: {
          autoIncrement: true,
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true
        },
        user_id: {
          allowNull: false,
          type: DataTypes.BIGINT,
          onDelete: 'CASCADE',
          references: {
            model: 'users',
            key: 'user_id'
          }
        },
        group_id: {
          allowNull: false,
          type: DataTypes.BIGINT,
          onDelete: 'CASCADE',
          references: {
            model: 'groups',
            key: 'id'
          }
        },
        created_at: {
          allowNull: false,
          type: DataTypes.DATE
        },
        updated_at: {
          allowNull: false,
          type: DataTypes.DATE
        }
      }, {
        schema: 'public',
        transaction
      })

      await queryInterface.addIndex('public.user_groups', ['user_id', 'group_id'], {
        name: 'index_user_groups_on_user_id_and_group_id', transaction
      })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.dropTable('user_groups', { schema: 'public' })
  }
}
