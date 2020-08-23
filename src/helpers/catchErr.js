// Funcion para atrapar los errores de Async Await. Para no usar try catch
const catchErr = ( promise ) =>
  promise
  .then(result => ({ok:true, result}))
  .catch(error => ({ok:false, error}));

  module.exports = catchErr;