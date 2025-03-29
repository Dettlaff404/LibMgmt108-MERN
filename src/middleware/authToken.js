const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

const authToken = (req, res, next) => {
    const token = req.headers("Authorization") && req.headers("Authorization").replace("Bearer ", "");
    console.log(token);

    if (!token) {
        return res.status(401).json({ error: "No token and authorization failed" });
    }

    try {
        console.log("JWT Secret",jwtSecret);
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    }catch (error) {
        console.error(error);   
        return res.status(401).json({ error: "Invalid Token" });
    }
};

module.exports = authToken;