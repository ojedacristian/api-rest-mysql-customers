const sql = require('./database.js');


//HANDLE ERRORS
const catchErr = ( promise ) =>
  promise
  .then(result => ({ok:true, result}))
  .catch(error => ({ok:false, error}));



// constructor
const Customer = function (customer) {
  this.email = customer.email;
  this.name = customer.name;
  this.active = customer.active;
};

// Crear Customer
Customer.create = async (newCustomer) => {
  return await catchErr(sql.query("INSERT INTO custmers SET ?", [newCustomer]))
  }
// Customer.create = (newCustomer, result) => {
//   sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     console.log("created customer: ", { id: res.insertId, ...newCustomer });
//     result(null, { id: res.insertId, ...newCustomer });
//   });
// };





// Encontrar por ID

Customer.findById = async (customerId) => {
    return await catchErr(sql.query(`SELECT * FROM customers WHERE id = ${customerId}`))
    // return {ok, result, error};
    // console.log('esta parte no se ejecuta');
  }

    // if(ok){
    //   if (result.length) {
    //     console.log("found customer: ", result[0]);
    //     return [null, result[0]];
    //   }
    //   // not found Customer with the id
    //   return [{ kind: "not_found" }, null];
    // } else {
    //   console.log("error: ", error);
    //   return [error, null];
    // }

// Customer.findById = async (customerId) => {
//   const { ok, result, error} = await catcher(sql.query(`SELECT * FROM customers WHERE id = ${customerId}`))
//   if(ok){
//     if (result.length) {
//       console.log("found customer: ", result[0]);
//       return [null, result[0]];
//     }
//     // not found Customer with the id
//     return [{ kind: "not_found" }, null];
//   } else {
//     console.log("error: ", error);
//     return [error, null];
//   }
// }



// Customer.findById = async (customerId, result) => {
//   try {
//     const res = await sql.query(`SELECT * FROM customers WHERE id = ${customerId}`)
//     if (res.length) {
//       console.log("found customer: ", res[0]);
//       return [null, res[0]];
//     }
//     // not found Customer with the id
//     return [{ kind: "not_found" }, null];

//   } catch (err) {
//     console.log("error: ", err);
//     return [err, null];
//   }
// }




// Customer.findById = (customerId, result) => {
//   sql.query(`SELECT * FROM customers WHERE id = ${customerId}`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       console.log("found customer: ", res[0]);
//       result(null, res[0]);
//       return;
//     }

//     // not found Customer with the id
//     result({ kind: "not_found" }, null);
//   });
// };


// Select all Customer
Customer.getAll = async () => {
  try {
    const res = await sql.query("SELECT * FROM customers")
    console.log("customers: ", res);
    return [null, res];
  } catch (err) {
    console.log("error: ", err);
    return [err, null];
  }
}



// Customer.getAll = result => {
//   sql.query("SELECT * FROM customers", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     console.log("customers: ", res);
//     result(null, res);
//   });
// };

// Customer.getAll = async (result) => {

//   try {
//     const res = await sql.query("SELECT * FROM customers")
//     console.log("customers: ", res);
//     result(null, res);
//   } catch (err) {
//     console.log("error: ", err);
//     result(err, null);
//   }
// }


// Actualizar Customer
Customer.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
    [customer.email, customer.name, customer.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

// Eliminar Customer
Customer.remove = (id, result) => {
  sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

// Eliminar todos
Customer.removeAll = result => {
  sql.query("DELETE FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

module.exports = Customer;