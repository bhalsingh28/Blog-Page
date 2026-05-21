const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not Token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, "JWT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = authMiddleware;
