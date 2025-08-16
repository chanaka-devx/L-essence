const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("Auth Header:", authHeader);
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Invalid token format" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT Error:", err);
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = {
      ...decoded,
      user_id: decoded.id || decoded.user_id,
    };
    console.log("Decoded:", decoded); 
    next();
  });
};
