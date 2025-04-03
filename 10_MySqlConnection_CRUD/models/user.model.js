const { DataTypes } = require('sequelize');
const connection = require('../config/MySqlConnection'); // Ensure this file exists!

const User = connection.define('User', {
    // ID Column
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    // Name Column
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Email Column
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true, // ✅ Ensures valid email format
        }
    },
    // Age Column
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0 // ✅ Prevents negative ages
        }
    },
    // Created At
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    // Updated At
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'users',
    timestamps: true // ✅ Ensures Sequelize manages timestamps
});

module.exports = User;
