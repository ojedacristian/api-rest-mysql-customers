const Customer = require("../models/customer.model.js");

// Create and Save a new Customer
exports.create = async (req, res, next) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const customer = new Customer({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active
  });

  // Save Customer in the database
  const {ok, result, error} = await Customer.create(customer)
    if(!ok){
      console.log("error: ", error);
      // res.status(500).send({
      //   message: error.message || "Some error occurred while creating the Customer."
      // });
      next(error)
    }else{
      console.log("created customer: ", { id: result.insertId, ...customer });
      res.send({id:result.insertId, ...customer});
    } 
  }



// Retrieve all Customers from the database.
// exports.findAll = (req, res) => {
//     Customer.getAll((err, data) => {
//       if (err)
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving customers."
//         });
//       else res.send(data);
//     });
//   };

exports.findAll = async (req, res) => {

  [err, data] = await Customer.getAll();
  console.log(err, data);

  if (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving customers."
    });
  } else {
    res.send(data);
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

// exports.findOne = async (req, res) => {
//   const [err, data ] = await Customer.findById(req.params.customerId);
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Customer with id ${req.params.customerId}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Error retrieving Customer with id " + req.params.customerId
//         });
//       }
//     } else res.send(data);
//   }



// exports.findOne = (req, res) => {
//   Customer.findById(req.params.customerId, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Customer with id ${req.params.customerId}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Error retrieving Customer with id " + req.params.customerId
//         });
//       }
//     } else res.send(data);
//   });
// };





// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Customer.updateById(
    req.params.customerId,
    new Customer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.customerId
          });
        }
      } else res.send(data);
    }
  );
};




// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Customer.remove(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.customerId
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};
// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Customer.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};