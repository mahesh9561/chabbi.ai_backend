const jwt = require('jsonwebtoken');
const JWT_SECRET = "your_jwt_secret_key";

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified; // Add user data to the request object
        next(); // Continue to the next middleware or route
    } catch (error) {
        res.status(403).json({ message: "Invalid or Expired Token" });
    }
};

module.exports = authenticateToken;
