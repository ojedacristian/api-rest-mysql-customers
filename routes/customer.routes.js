const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config.js');
const aws = require('../controllers/aws.controller.js');
const customers = require("../controllers/customer.controller.js");
  
    // Create a new Customer
    router.post("/customers", upload.single('image'), aws.doUpload, customers.create);
  
    // Retrieve all Customers
    router.get("/customers", customers.findAll);
  
    // Retrieve a single Customer with customerId
    router.get("/customers/:customerId", customers.findOne);
  
    // Update a Customer with customerId
    router.put("/customers/:customerId", customers.update);
  
    // Delete a Customer with customerId
    router.delete("/customers/:customerId", customers.delete);
  
    // Create a new Customer
    router.delete("/customers", customers.deleteAll);

module.exports = router;