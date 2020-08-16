const sql = require('./database.js');
const catchErr = require('../helpers/catchErr.js');

// constructor
const Customer = function (customer) {
  this.email = customer.email;
  this.name = customer.name;
  this.active = customer.active;
};

// Crear Customer
Customer.create = async (newCustomer) => {
  return await catchErr(sql.query("INSERT INTO customers SET ?", [newCustomer]))
  }

// Encontrar por ID

Customer.findById = async (customerId) => {
    return await catchErr(sql.query(`SELECT * FROM customers WHERE id = ?`, [customerId]))
  }

// Select all Customer
Customer.getAll = async () => {
  return await catchErr(sql.query("SELECT * FROM customers"));
}

// Actualizar Customer
Customer.updateById = async (id, customer) => {
  return await catchErr(sql.query("UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",[customer.email, customer.name, customer.active, id])) 

};

// Eliminar Customer
Customer.remove = async (id) => {
  return await catchErr(sql.query("DELETE FROM customers WHERE id = ?", id))
  }

// Eliminar todos
Customer.removeAll = async() => {
  return await catchErr(sql.query("DELETE FROM customers"))
  }

module.exports = Customer;