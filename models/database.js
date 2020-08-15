const mysql = require('mysql');
const dbconfig = require('../config/db.config.js');

// Create a connection to the database
const connection = mysql.createConnection(dbconfig);

// open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
});

module.exports = connection;
