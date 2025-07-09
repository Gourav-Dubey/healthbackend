const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

// ✅ 1. CORS Setup (Dynamic)
const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://healthapp-h659.vercel.app", // deployed frontend (Vercel)
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

const journalRoutes = require("./routes/journalRoutes");
const meditationRoutes = require("./routes/meditationRoutes");




// ✅ 2. Middleware
app.use(express.json()); // For parsing JSON


app.get("/api/ping", (req, res) => {
  // console.log("🟢 Ping by UptimeRobot:", new Date().toLocaleString());
  res.status(200).json({ message: "pong" });
});


// ✅ 3. Connect to DB
connectDB();

// ✅ 4. API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api", journalRoutes);
app.use("/api/mood", require("./routes/moodRoutes"));

// ✅ ✅ ✅ Add meditation route here
app.use("/api/meditation", meditationRoutes);






// ✅ 5. Not Found Route
app.use((req, res, next) => {
  res.status(404).json({ msg: "Route not found" });
});

// ✅ 6. Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Internal Server Error" });
});

// ✅ 7. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});   







