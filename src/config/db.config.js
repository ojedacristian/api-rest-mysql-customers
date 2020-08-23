require('dotenv').config();

const dbconfig = {
  host: process.env.HOST,
  user: process.env.USUARIO,
  password: process.env.PASSWORD,
  database: process.env.DB,
  port: process.env.PORT
};

module.exports = dbconfig;
