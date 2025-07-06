
const express = require("express");
const { addMood, getMoods } = require("../controllers/moodController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, addMood);
router.get("/", verifyToken, getMoods);

module.exports = router;
