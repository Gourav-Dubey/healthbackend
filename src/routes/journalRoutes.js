

// const express = require("express");
// const router = express.Router();
// const {
//   createJournal,
//   getUserJournals,
//  deleteJournal, // Added deleteJournal for completeness
// } = require("../controllers/journalController");

// const { verifyToken } = require("../middleware/authMiddleware"); // ✅ Corrected here

// router.post("/journal", verifyToken, createJournal); // ✅ POST
// router.get("/journal", verifyToken, getUserJournals); // ✅ GET
// router.delete("/journal/:id", verifyToken, deleteJournal);

// module.exports = router;


const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const {
  createJournal,
  getUserJournals,
  deleteJournal,
  updateJournal,
} = require("../controllers/journalController");

// ✅ GET all journals for a user
router.get("/journal", verifyToken, getUserJournals);

// ✅ POST a new journal
router.post("/journal", verifyToken, createJournal);

// ✅ DELETE a journal by ID
router.delete("/journal/:id", verifyToken, deleteJournal);

// ✅ UPDATE a journal by ID
router.put("/journal/:id", verifyToken, updateJournal);

module.exports = router;
