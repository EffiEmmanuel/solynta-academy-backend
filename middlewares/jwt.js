const jwt = require('jsonwebtoken')
require("dotenv").config()

const signToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
}

const authenticateToken = (request, response, next) => {
    const token = request.headers.token.split(' ')[1]
    if(!token) {
        return response.status(401).json({
            success: false,
            message: "No token provided"
        })
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err){
            return response.status(403).json({
                success: false,
                message: "Invalid token"
            })
        }
        request.user = user
        next()
    })
}
const authorizeRole = (roleName) => (req, res, next) => {
    if (!req.user.roles.some((role) => role.name === roleName)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
  
    next();
  };

module.exports = {
    signToken, authenticateToken, authorizeRole
}