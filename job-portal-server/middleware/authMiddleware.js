const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

const authenticateToken = (req, res, next) => {
    console.log("🔹 Full Headers:", req.headers); // Log all headers

    const authHeader = req.headers["authorization"]; // Ensure consistent casing
    console.log("🔹 Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("❌ No valid Authorization header found.");
        return res.status(401).json({ error: "Access Denied. No token provided." });
    }

    const token = authHeader.split(' ')[1].trim(); // Extract token and remove spaces
    console.log("🔹 Extracted Token:", token);

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("❌ JWT Verification Failed:", err);
            return res.status(403).json({ error: "Invalid token. Access Denied." });
        }
        console.log("✅ Token Decoded:", decoded);
        req.user = { id: decoded.id };
        next();
    });
};

module.exports = authenticateToken;
