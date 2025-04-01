const jwt = require("jsonwebtoken");

exports.verifiedUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = decoded; // Attach the decoded user info to the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

exports.checkRoles = (role) => (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "Access denied. User not verified." });
  }

  if (req.user.role === role) {
    return next();
  }

  return res
    .status(403)
    .json({ message: "Access denied. Insufficient permissions." });
};
