const jwt = require("jsonwebtoken");
const { config } = require("../configs/server.config.js");
module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.secretKey);

    req.user = {
      _id: decoded.userId,
    };

    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication failed" });
  }
};
