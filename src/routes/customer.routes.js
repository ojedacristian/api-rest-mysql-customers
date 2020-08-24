const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config.js');
const aws = require('../controllers/aws.controller.js');
const customers = require("../controllers/customer.controller.js");
const {verifyToken} = require('../controllers/auth/jwt.js');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validarCampos.js');


    // Create a new Customer
    router.post("/customers",[
        check('name', 'Name is obligatory').not().isEmpty(),
        check('email', 'El Email es obligatorio').isEmail(),
        validarCampos
    ], 
    // upload.single('image'), aws.doUpload,
     customers.create);
  
    // Retrieve all Customers
    router.get("/customers", customers.findAll);
  
    // Retrieve a single Customer with customerId
    router.get("/customers/:customerId", customers.findOne);
  
    // Update a Customer with customerId
    router.put("/customers/:customerId", customers.update);
  
    // Delete a Customer with customerId
    router.delete("/customers/:customerId",verifyToken, customers.delete);
  
    // Create a new Customer
    router.delete("/customers", customers.deleteAll);

module.exports = router;