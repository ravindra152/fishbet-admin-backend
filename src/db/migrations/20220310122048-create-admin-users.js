'use strict'

module.exports = {
  async up (queryInterface, DataTypes) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('admin_users', {
        admin_user_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        first_name: {
          type: DataTypes.STRING,
          allowNull: true
        },
        last_name: {
          type: DataTypes.STRING
        },
        phone: {
          type: DataTypes.STRING
        },
        is_phone_verified: {
          type: DataTypes.BOOLEAN,
          default: true
        },
        admin_role_id: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        parent_type: {
          type: DataTypes.STRING,
          allowNull: true
        },
        parent_id: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: true
        },
        reset_password_token: {
          type: DataTypes.STRING,
          allowNull: true
        },
        reset_password_sent_at: {
          type: DataTypes.DATE,
          allowNull: true
        },
        admin_username: {
          type: DataTypes.STRING,
          allowNull: true
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true
        },
        group: {
          type: DataTypes.STRING,
          allowNull: true
        },
        permission: {
          type: DataTypes.JSONB,
          allowNull: false
        },
        created_at: {
          allowNull: true,
          type: DataTypes.DATE
        },
        updated_at: {
          allowNull: true,
          type: DataTypes.DATE
        }
      }, { schema: 'public', transaction })

      await queryInterface.addIndex('public.admin_users', ['email', 'admin_username'], { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.dropTable('admin_users', { schema: 'public' })
  }
}
