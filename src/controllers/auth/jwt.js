const jwt = require('jsonwebtoken');
require('dotenv').config();

async function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided' });
    }
    // Decode the Tokenreq.userId = decoded.id;
    try {
        const decoded = await jwt.verify(token, process.env.SECRET);
        req.userId = decoded.id;
        next();   
    } catch (error) {
        res.status(200).send({ auth: false, message: 'Invalid Token' });
    }
}

const generarToken = ( id ) =>{

    return new Promise((resolve, reject) => {

        const payload = { id };

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
          }, (err, token)=>{
              if (err){
                  console.log(error);
                  reject('no se pudo generar el token')
              }
              resolve(token);
          });
    })

}


module.exports = {
    verifyToken,
    generarToken
};