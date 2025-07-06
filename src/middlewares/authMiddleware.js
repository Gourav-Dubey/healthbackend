const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(401).json({ msg: "User not found" });

    req.user = user;           // full user object
    req.userId = user._id;     // ✅ add this line (important!)
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = { verifyToken };
