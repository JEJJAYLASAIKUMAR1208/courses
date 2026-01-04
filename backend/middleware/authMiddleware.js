const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log("========== AUTH MIDDLEWARE ==========");

  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader);

  if (!authHeader) {
    console.log("❌ Token missing");
    return res.status(401).json({ message: "Token missing" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Extracted Token:", token);

  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("✅ Token verified successfully");
    next();
  } catch (err) {
    console.log("❌ Token verification failed:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};
