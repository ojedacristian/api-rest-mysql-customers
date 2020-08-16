function handleErrors(err, req, res, next) {
    console.log(err);
    res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      })
  };

module.exports = handleErrors;