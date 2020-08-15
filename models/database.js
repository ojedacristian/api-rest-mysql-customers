const mysql = require('mysql');
const dbconfig = require('../config/db.config.js');

// Create a connection to the database
const connection = mysql.createPool(dbconfig);

// open the MySQL connection
connection.getConnection((error) => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
});

module.exports = connection;
