'use strict'
const { DOCUMENT_STATUS_TYPES, DOCUMENT_TYPES } = require("@src/utils/constant")

module.exports = {
  async up(queryInterface, DataTypes) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('user_documents', {
        user_document_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        document_url: {
          type: DataTypes.JSONB,
          allowNull: true,
          comment: 'document URl'
        },
        // level: {
        //   type: DataTypes.INTEGER,
        //   defaultValue: 1
        // },
        document_name: {
          type: DataTypes.STRING,
          allowNull: true
        },
        status: {
          type: DataTypes.ENUM(Object.values(DOCUMENT_STATUS_TYPES)),
          allowNull: false,
          defaultValue: DOCUMENT_STATUS_TYPES.PENDING
        },
        signature: {
          type: DataTypes.STRING,
          allowNull: true
        },
        veriff_applicant_id: {
          type: DataTypes.STRING,
          allowNull: true
        },
        // actionee: {
        //   type: DataTypes.STRING,
        //   allowNull: true
        // },
        // action_performed_at: {
        //   type: DataTypes.DATE,
        //   allowNull: true
        // },
        document_type: {
          type: DataTypes.STRING,
          allowNull: false
        },
        reason: {
          type: DataTypes.TEXT,
          allowNull: true,
          comment: 'reason for rejection if rejected'
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

      await queryInterface.addIndex('public.user_documents', ['user_id'], {
        name: 'index_user_documents_on_user_id', transaction
      })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('user_documents', { schema: 'public' })
  }
}
