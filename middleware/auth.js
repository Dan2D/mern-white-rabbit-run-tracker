const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_ID = process.env.JWT_ID;

// Used to run private routes
function auth(req, res, next) {
    // Purpose of the function is to get the token
    const token = req.header('x-auth-token');

    if (!token){
        return res.status(401).json('Unauthorized Permissions')
    }
    try{
            // Verify Token
    const decoded = jwt.verify(token, JWT_ID);
    
    // Add user from payload
    req.user = decoded;
    next();
    }catch(e){
        return res.status(400).json('Token is not valid')
    }
}

module.exports = auth;