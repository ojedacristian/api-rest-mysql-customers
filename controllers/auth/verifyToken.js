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

module.exports = verifyToken;