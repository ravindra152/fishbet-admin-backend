'use strict'

module.exports = {
  async up (queryInterface, DataTypes) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('document_labels', {
        document_label_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        name: {
          type: DataTypes.JSONB,
          allowNull: false
        },
        is_required: {
          type: DataTypes.BOOLEAN,
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

      await queryInterface.addIndex('public.document_labels', ['is_required'], {
        name: 'index_document_labels_on_is_required', transaction
      })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.dropTable('document_labels', { schema: 'public' })
  }
}
