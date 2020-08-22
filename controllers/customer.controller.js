const Customer = require("../models/customer.model.js");
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Create and Save a new Customer
exports.create = async (req, res, next) => {
  // Validate request
  
  
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Inicializa al Customer definido en el Model
  const customer = new Customer({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active,
    avatar: req.body.location
  });

  // Save Customer in the database
  const {ok, result, error} = await Customer.create(customer)
    if(!ok){
      next(error)
    } else {
      console.log("created customer: ", { id: result.insertId, ...customer });
      const token = jwt.sign({ id: result.insertId }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
      });
      res.send({auth:true, id:result.insertId, ...customer, token});
    } 
  }

exports.findAll = async (req, res, next) => {
  const { ok, result, error } = await Customer.getAll();
  if (!ok) {
    next(error)
  } else {
    res.send(result);
  }
};

// Find a single Customer with a customerId
exports.findOne = async (req, res) => {
  const { ok, result, error } = await Customer.findById(req.params.customerId);
  if (ok) {
    if (result.length) {
      console.log("found customer: ", result[0]);
      res.send(result[0]);
    } else {
      // not found Customer with the id
      res.status(404).send({
        message: `Not found Customer with id ${req.params.customerId}.`
      });
    }
  } else {
    console.log("error: ", error);
    res.status(500).send({
      message: "Error retrieving Customer with id " + req.params.customerId
    });
  }
}

// Update a Customer identified by the customerId in the request
exports.update = async (req, res,next) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const { ok, result, error } = await Customer.updateById(req.params.customerId, new Customer(req.body))
  if(!ok){
    next(error)
  } else {
    if ( result.affectedRows ){
      console.log("updated customer: ", { id: req.params.customerId, ...req.body });
      res.send({ ...req.body, id: req.params.customerId });
    } else {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
    }
  }      

}


// Delete a Customer with the specified customerId in the request
exports.delete = async (req, res, next) => {
  const { ok, result, error} = await Customer.remove(req.params.customerId)
    if (!ok) {
      next(error)
    } else {
      if( result.affectedRows ){
        res.send({ message: `Customer ${req.params.customerId} was deleted successfully!` });
      } else {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      }
    }
  } 

// Delete all Customers from the database.
exports.deleteAll = async (req, res, next) => {
  const { ok, result, error } = await Customer.removeAll()
    if (!ok){
      next(error)
    } else {
      res.send({ message: `${ result.affectedRows } Customers were deleted successfully!` })
    } 
  }