const s3 = require('../config/s3.config.js');

exports.doUpload = (req, res,next) => {
  const { s3Client } = s3;
  const params = s3.uploadParams;
  console.log(req.file);
  params.Key = req.file.originalname;
  params.Body = req.file.buffer;
  // console.log(req.body);
  s3Client.upload(params, (err, data) => {
    if (err) {
      res.status(500).json({ error: `Error al subir la img-> ${err}` });
    }
    req.body.location = data.Location;
    next()
  });
};
