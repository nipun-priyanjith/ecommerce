const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Replace with your actual model path

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Extract token

      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode token

      req.user = await User.findById(decoded.id).select("-password"); // Fetch user and attach to req

      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      res.status(401).json({ message: "Unauthorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized, no token" });
  }
};

module.exports = { protect };
