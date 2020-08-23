const mysql = require('mysql');
const { promisify } = require('util');
const dbconfig = require('../config/db.config.js');

// Create a connection to the database
const pool = mysql.createPool(dbconfig);


pool.getConnection((err, connection) => {
  if (err) {
    console.log(err.code);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database Connection was closed');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has to many connections');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('DATABASE CONNECTION WAS REFUSED');
    }
  }

  if (connection) {
    connection.release();
    console.log('Conexion a la BD realizada');
  }
});

// Para poder usar promesas en vez de callbacks
pool.query = promisify(pool.query);

module.exports = pool;
