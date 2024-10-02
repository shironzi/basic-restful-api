const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.HOST || 'localhost',
    dialect: 'mysql',
    port: process.env.PORT || 3306,
    logging: console.log,
});

module.exports = sequelize;