const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('user', 'root', 'root123', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306 // Change if needed
});

module.exports = sequelize;


