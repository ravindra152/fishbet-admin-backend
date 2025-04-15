'use strict'

module.exports = {
  async up(queryInterface, DataTypes) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('users', {
        user_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        username: {
          type: DataTypes.STRING,
          allowNull: true
        },
        first_name: {
          type: DataTypes.STRING,
          allowNull: true
        },
        last_name: {
          type: DataTypes.STRING,
          allowNull: true
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true
        },
        is_email_verified: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },
        password: {
          type: DataTypes.STRING,
          allowNull: true
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: true
        },
        date_of_birth: {
          type: DataTypes.DATE,
          allowNull: true
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          defaultValue: true
        },
        last_login_date: {
          type: DataTypes.DATE,
          allowNull: true
        },
        phone_code: {
          type: DataTypes.STRING,
          allowNull: true
        },
        city: {
          type: DataTypes.STRING,
          allowNull: true
        },
        state_code: {
          type: DataTypes.STRING,
          allowNull: true,
          references: {
            model: 'states',
            key: 'state_code'
          }
        },
        profile_image: {
          type: DataTypes.STRING,
          allowNull: true
        },
        currency_code: {
          type: DataTypes.STRING,
          allowNull: true
        },
        is_internal_user: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },
        ref_parent_id: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        referral_code: {
          type: DataTypes.STRING,
          allowNull: true
        },
        locale: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: 'EN'
        },
        veriff_status: {
          type: DataTypes.STRING,
          allowNull: true
        },
        other: {
          type: DataTypes.JSONB,
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
      }, { schema: 'public', transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('users', { schema: 'public' })
  }
}
