const express = require('express');
const app = express();
const handleErrors = require('./middlewares/handleErrors.js')

// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({extended:false}))

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Rest API' });
});

// require("./routes/customer.routes.js")(app);
app.use(require('./routes/customer.routes.js'));
app.use(handleErrors);

// set port, listen for requests
app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});