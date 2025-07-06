// const Journal = require("../models/Journal");

// // ✅ Create new journal entry
// exports.createJournal = async (req, res) => {
//   try {
//     const { text } = req.body;

//     const newEntry = new Journal({
//       user: req.userId, // 🧠 userId middleware (auth) se milta hai
//       text,
//     });

//     await newEntry.save();

//     console.log("New journal saved:", newEntry);
//     res.status(201).json({ message: "Journal entry saved successfully" });
//   } catch (err) {
//     console.error("Error saving journal:", err);
//     res.status(500).json({ error: "Server error while saving journal" });
//   }
// };

// // ✅ Get all journals for current user
// exports.getUserJournals = async (req, res) => {
//   try {
//     const journals = await Journal.find({ user: req.userId }).sort({ createdAt: -1 });

//     res.json(journals);
//   } catch (err) {
//     console.error("Error fetching journals:", err);
//     res.status(500).json({ error: "Error fetching journals" });
//   }
// };

// // ✅ Delete a journal by ID
// exports.deleteJournal = async (req, res) => {
//   try {
//     const journalId = req.params.id;

//     const deleted = await Journal.findOneAndDelete({
//       _id: journalId,
//       user: req.userId,
//     });

//     if (!deleted) {
//       return res.status(404).json({ msg: "Entry not found" });
//     }

//     console.log("Deleted journal:", deleted);
//     res.json({ msg: "Journal entry deleted" });
//   } catch (err) {
//     console.error("Error deleting journal:", err);
//     res.status(500).json({ error: "Error deleting entry" });
//   }
// };



const Journal = require("../models/Journal");

// ✅ Create new journal entry
exports.createJournal = async (req, res) => {
  try {
    const { text } = req.body;

    const newEntry = new Journal({
      user: req.userId, // 🧠 userId middleware (auth) se milta hai
      text,
    });

    await newEntry.save();

    console.log("New journal saved:", newEntry);
    res.status(201).json({ message: "Journal entry saved successfully" });
  } catch (err) {
    console.error("Error saving journal:", err);
    res.status(500).json({ error: "Server error while saving journal" });
  }
};

// ✅ Get all journals for current user
exports.getUserJournals = async (req, res) => {
  try {
    const journals = await Journal.find({ user: req.userId }).sort({ createdAt: -1 });

    res.json(journals);
  } catch (err) {
    console.error("Error fetching journals:", err);
    res.status(500).json({ error: "Error fetching journals" });
  }
};

// ✅ Delete a journal by ID
exports.deleteJournal = async (req, res) => {
  try {
    const journalId = req.params.id;

    const deleted = await Journal.findOneAndDelete({
      _id: journalId,
      user: req.userId,
    });

    if (!deleted) {
      return res.status(404).json({ msg: "Entry not found" });
    }

    console.log("Deleted journal:", deleted);
    res.json({ msg: "Journal entry deleted" });
  } catch (err) {
    console.error("Error deleting journal:", err);
    res.status(500).json({ error: "Error deleting entry" });
  }
};

// ✅ Update a journal by ID
exports.updateJournal = async (req, res) => {
  const { text } = req.body;
  const journalId = req.params.id;

  try {
    const updated = await Journal.findOneAndUpdate(
      { _id: journalId, user: req.userId },
      { text },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Entry not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Error updating journal:", err);
    res.status(500).json({ error: "Server error during update" });
  }
};

