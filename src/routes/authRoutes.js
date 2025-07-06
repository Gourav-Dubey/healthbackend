// const express = require("express");
// const router = express.Router();
// const { register, login } = require("../controllers/authController");
// // const { register, login, getProfile } = require("../controllers/authController");

// const { verifyToken } = require("../middleware/authMiddleware");
// const User = require("../models/User");

// router.post("/register", register);
// router.post("/login", login);

// // ✅ New protected route
// // router.get("/profile", verifyToken, async (req, res) => {
// //   try {
// //     const user = await User.findById(req.userId).select("-password");
// //     if (!user) return res.status(404).json({ msg: "User not found" });
// //     res.json({ user });
// //   } catch (err) {
// //     res.status(500).json({ msg: "Server error" });
// //   }
// // });

// module.exports = router;

const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authMiddleware");
const User = require("../models/User");

router.post("/register", register);
router.post("/login", login);

// ✅ New protected route
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;