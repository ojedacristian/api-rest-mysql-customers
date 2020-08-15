const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Rest API' });
});

// require("./routes/customer.routes.js")(app);
app.use(require('./routes/customer.routes.js'));


// set port, listen for requests
app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
