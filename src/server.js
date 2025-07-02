// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
// const authRoutes = require("./routes/authRoutes");

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect DB
// connectDB();

// // Routes
// // app.use("/api/auth", authRoutes);
// app.use("/api/auth", require("./routes/authRoutes"));


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on ${PORT}`));

// app.use(cors({
//   origin: 'https://healthapp-h659.vercel.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));

// const aiRoutes = require("./routes/aiRoutes");
// app.use("/api/ai", aiRoutes);



// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");

// dotenv.config();
// const app = express();

// // ✅ CORS sabse pehle
// app.use(cors({
//   origin: "https://healthapp-h659.vercel.app",
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));

// app.use(express.json());

// // ✅ DB connect
// connectDB();

// // ✅ Routes
// app.use("/api/auth", require("./routes/authRoutes"));

// app.use("/api/ai", require("./routes/aiRoutes"));

// // ✅ Server start
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on ${PORT}`));





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

// ✅ 2. Middleware
app.use(express.json()); // For parsing JSON

// ✅ 3. Connect to DB
connectDB();

// ✅ 4. API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
// Add other routes like journalRoutes, moodRoutes if needed
// app.use("/api/journal", require("./routes/journalRoutes"));

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
