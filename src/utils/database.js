const mysql = require('mysql2');

const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];
const app_config = require('../config/app_config');

// Open the connection to MySQL server
const connection = mysql.createConnection({
  host: app_config.DB_HOST,
  user: app_config.DB_USER,
  password: app_config.DB_PASSWORD,
});

// Run create database statement
connection.query(
  `CREATE DATABASE IF NOT EXISTS ${config.database}`,
  (err, results) => {},
);

// Close the connection
connection.end();
