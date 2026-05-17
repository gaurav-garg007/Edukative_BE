const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const verifyToken = (req, res, next) => {
    let token = req.headers["authorization"] || req.headers["Authorization"];
    if(!token) return res.status(403).json({message: "No token provided"});

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
}

module.exports = {
    verifyToken
}