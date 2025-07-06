const Mood = require("../models/Mood");

const addMood = async (req, res) => {
  try {
    const { mood, message, date } = req.body;
    const newMood = new Mood({
      user: req.user._id,
      mood,
      message,
      date,
    });
    await newMood.save();
    res.status(201).json(newMood);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to save mood" });
  }
};

const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user._id }).sort({ date: -1 });
    res.json(moods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to fetch moods" });
  }
};

module.exports = { addMood, getMoods };
