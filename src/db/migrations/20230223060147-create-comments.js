'use strict'

module.exports = {
  async up (queryInterface, DataTypes) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('comments', {
        comment_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false
        },
        comment: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        commented_by: {
          type: DataTypes.STRING,
          allowNull: false
        },
        status: {
          type: DataTypes.BOOLEAN,
          defaultValue: true
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false
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

      await queryInterface.addIndex('public.comments', ['user_id'], {
        name: 'index_comments_on_user_id', transaction
      })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.dropTable('comments', { schema: 'public' })
  }
}
