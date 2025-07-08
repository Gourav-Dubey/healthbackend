

const express = require("express");
const router = express.Router();
const Meditation = require("../models/Meditation");
const { verifyToken } = require("../middlewares/authMiddleware");

// ✅ POST - Save meditation session
router.post("/", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const today = new Date().toDateString(); // e.g., "Tue Jul 09 2025"
    const yesterday = new Date(Date.now() - 86400000).toDateString(); // 1 day before

    let record = await Meditation.findOne({ userId });

    if (record) {
      // 🛑 Already meditated today?
      if (record.lastMeditated === today) {
        return res.status(200).json({
          message: "Already meditated today",
          streak: record.streak,
        });
      }

      // ✅ Update streak logic
      record.streak = record.lastMeditated === yesterday ? record.streak + 1 : 1;
      record.lastMeditated = today;

      // ✅ Avoid duplicate in history[]
      const alreadyLogged = record.history.some(
        (entry) => new Date(entry.date).toDateString() === today
      );

      if (!alreadyLogged) {
        record.history.push({ date: new Date() });
      }

      await record.save();

      return res.status(200).json({
        message: "Meditation session recorded",
        streak: record.streak,
      });
    }

    // 🔰 If no record yet (first time meditation)
    record = await Meditation.create({
      userId,
      lastMeditated: today,
      streak: 1,
      history: [{ date: new Date() }],
    });

    return res.status(201).json({
      message: "Meditation session started",
      streak: record.streak,
    });
  } catch (err) {
    console.error("Error saving meditation:", err);
    res.status(500).json({ error: "Failed to record meditation" });
  }
});

// ✅ GET - Current streak
router.get("/", verifyToken, async (req, res) => {
  try {
    const record = await Meditation.findOne({ userId: req.userId });

    res.status(200).json({
      streak: record?.streak || 0,
      lastMeditated: record?.lastMeditated || null,
    });
  } catch (err) {
    console.error("Error fetching streak:", err);
    res.status(500).json({ error: "Failed to fetch streak" });
  }
});

// ✅ GET - Meditation history
router.get("/history", verifyToken, async (req, res) => {
  try {
    const record = await Meditation.findOne({ userId: req.userId });
    res.status(200).json({ history: record?.history || [] });
  } catch (err) {
    console.error("Error fetching history:", err);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

module.exports = router;
