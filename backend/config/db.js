const { Sequelize } = require('sequelize');
import dotenv from 'dotenv';

dotenv.config();

// Database configuration
const dbConfig = {
  development: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'lessence_db',
    dialect: 'mysql',
    logging: console.log, // Enable logging in development
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};
