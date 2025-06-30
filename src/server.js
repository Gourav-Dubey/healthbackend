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



const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");

dotenv.config();
const app = express();

// ✅ Correct: CORS middleware with frontend URL
app.use(cors({
  origin: 'https://healthapp-h659.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
