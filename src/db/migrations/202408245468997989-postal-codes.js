'use strict';

const { POSTAL_CODE_STATUS } = require("@src/utils/constants/public.constants");

module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable('postal_codes', {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'user_id'
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            postal_code: {
                type: DataTypes.STRING,
                allowNull: false
            },
            gc_coin: {
                type: DataTypes.DOUBLE,
                allowNull: false,
                defaultValue: 0
            },
            sc_coin: {
                type: DataTypes.DOUBLE,
                defaultValue: 0
            },
            status: {
                type: DataTypes.ENUM(Object.values(POSTAL_CODE_STATUS)),
                allowNull: false,
                defaultValue: 'PENDING'
            },
            created_at: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updated_at: {
                allowNull: false,
                type: DataTypes.DATE
            }
        }, { schema: 'public' });
    },

    async down(queryInterface, DataTypes) {
        await queryInterface.dropTable('postal_codes', { schema: 'public' });
    }
};