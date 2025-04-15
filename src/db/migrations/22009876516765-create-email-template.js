'use strict'

module.exports = {
  async up (queryInterface, DataTypes) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('email_templates', {
        email_template_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        label: {
          type: DataTypes.STRING,
          allowNull: false
        },
        type: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        is_primary: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        dynamic_data: {
          type: DataTypes.JSONB,
          allowNull: false
        },
        template_code: {
          type: DataTypes.JSONB,
          allowNull: false
        },
        is_default: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
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

      await queryInterface.addIndex('public.email_templates', ['type'], {
        name: 'index_email_templates_on_type', transaction
      })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.dropTable('email_templates', { schema: 'public' })
  }
}
