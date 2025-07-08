const Meditation = require("../models/Meditation");

// Save a new meditation session
exports.addMeditationSession = async (req, res) => {
  try {
    const { duration } = req.body;
    const userId = req.userId;

    const newSession = new Meditation({
      user: userId,
      duration
    });

    await newSession.save();

    res.status(201).json({ msg: "Meditation session saved", session: newSession });
  } catch (err) {
    console.error("Error saving session:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all meditation sessions for a user
exports.getMeditationSessions = async (req, res) => {
  try {
    const userId = req.userId;

    const sessions = await Meditation.find({ user: userId }).sort({ completedAt: -1 });

    res.status(200).json({ sessions });
  } catch (err) {
    console.error("Error fetching sessions:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
