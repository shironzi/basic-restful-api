const { Sequelize } = require('sequelize');
const mysql = require('mysql2');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.HOST || 'localhost',
    dialect: 'mysql',
    port: process.env.PORT || 3306,
    logging: console.log,
});

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (err) {
        console.error("Unable to connect to the database:", err);
    } finally {
        await sequelize.close();
        console.log("Database connection closed.");
    }
};

connectToDatabase();