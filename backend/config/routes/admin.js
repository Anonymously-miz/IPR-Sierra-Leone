const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");
const Registration = require("../../Model/Registration");

const router = express.Router();

// Get all registrations (Admin Access)
router.get("/registrations", authMiddleware, async (req, res) => {
  try {
    const registrations = await Registration.find().populate("user", "username email");
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update registration status (Admin Access)
router.put("/registrations/:id", authMiddleware, async (req, res) => {
  const { status } = req.body;
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) return res.status(404).json({ message: "Registration not found" });

    registration.status = status;
    await registration.save();
    res.json({ message: "Status updated successfully!", registration });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
