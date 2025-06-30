const express = require("express");
const router = express.Router();
const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

router.post("/api/ai/suggest", async (req, res) => {
  const { mood, journal } = req.body;

  const prompt = `You are a mental health assistant. Based on the user's mood and journal, give 2-3 gentle suggestions to help improve their mental well-being.

Mood: ${mood}
Journal: ${journal || "Not provided"}
`;

  try {
  const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    const suggestion = geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text;
    res.json({ suggestion });
  } catch (error) {
    console.error("Gemini error:", error?.response?.data || error.message);
    res.status(500).json({ msg: "AI suggestion failed" });
  }
});

module.exports = router;
