const mysql = require("mysql2");
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/db_config.json')[env];

// Open the connection to MySQL server
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
});

// Run create database statement
connection.query(
  `CREATE DATABASE IF NOT EXISTS ${config.database}`,
  function (err, results) {
    // console.log(results);
    // console.log(err);
  }
);

// Close the connection
connection.end();