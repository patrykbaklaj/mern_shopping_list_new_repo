const config = require("config");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.header("x-auth-token");

    // Check for token
    if (!token) {
        res.status(401).send({ msg: "No token, authorization denied" });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, config.get("jwtSecret"));

        // Add user from payload
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).send({ msg: "Token is not valid" });
    }
};

module.exports = auth;