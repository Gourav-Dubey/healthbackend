const mongoose = require("mongoose");

const meditationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  lastMeditated: {
    type: String, // e.g., "Tue Jul 08 2025"
    required: true,
  },
  streak: {
    type: Number,
    default: 1,
  },
  history: [
    {
      date: {
        type: Date,
        default: Date.now,
      }
    }
  ]
});

module.exports = mongoose.model("Meditation", meditationSchema);
