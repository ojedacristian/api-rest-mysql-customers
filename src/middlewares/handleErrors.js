function handleErrors(err, req, res, next) {
    console.log('Estoy en el Handle Errors', err);
    res.status(500).send({
        message:
          err.message || "Ha ocurrido un error al intentar acceder al servidor"
      })
  };

module.exports = handleErrors;