// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");

// dotenv.config();
// const app = express();

// // ✅ 1. CORS Setup (Dynamic)
// const allowedOrigins = [
//   "http://localhost:5173", // local dev
//   "https://healthapp-h659.vercel.app", // deployed frontend (Vercel)
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE"],
// }));



// // ✅ 2. Middleware
// app.use(express.json()); // For parsing JSON

// // ✅ 3. Connect to DB
// connectDB();

// // ✅ 4. API Routes
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/ai", require("./routes/aiRoutes"));
// // Add other routes like journalRoutes, moodRoutes if needed
// // app.use("/api/journal", require("./routes/journalRoutes"));

// // ✅ 5. Not Found Route
// app.use((req, res, next) => {
//   res.status(404).json({ msg: "Route not found" });
// });

// // ✅ 6. Global Error Handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ msg: "Internal Server Error" });
// });

// // ✅ 7. Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });   



const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

// ✅ 1. CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://healthapp-h659.vercel.app"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));

// ✅ 1.5. Preflight requests
app.options("*", cors(corsOptions));

// ✅ 2. Middleware
app.use(express.json());

// ✅ 3. Connect to MongoDB
connectDB();

// ✅ 4. Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
// Add more routes here if needed
// app.use("/api/journal", require("./routes/journalRoutes"));

// ✅ 5. 404 Not Found Handler
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
