const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Event = require("../models/Event");

// Validation rules
const validateEvent = [
  body("title").notEmpty().withMessage("Event title is required"),
  body("description").notEmpty().withMessage("Event description is required"),
  body("date")
    .notEmpty()
    .withMessage("Event date is required")
    .isISO8601()
    .withMessage("Date must be in ISO8601 format"),
  body("venue").notEmpty().withMessage("Event venue is required"),
  body("capacity")
    .notEmpty()
    .withMessage("Event capacity is required")
    .isInt({ min: 1 })
    .withMessage("Capacity must be at least 1"),
  body("status")
    .optional()
    .isIn(["draft", "published", "cancelled"])
    .withMessage("Status must be draft, published, or cancelled"),
];

// CREATE Event
router.post("/", validateEvent, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map(e => e.msg) });
  }

  try {
    const event = new Event(req.body);
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ message: "Failed to save event", error: err.message });
  }
});

// GET all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ message: "Failed to retrieve events", error: err.message });
  }
});

// GET single event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ message: "Failed to retrieve event", error: err.message });
  }
});

// UPDATE event
router.put("/:id", validateEvent, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array().map(e => e.msg) });

  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) return res.status(404).json({ message: "Event not found" });
    res.json(updatedEvent);
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ message: "Failed to update event", error: err.message });
  }
});

// DELETE event
router.delete("/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ message: "Failed to delete event", error: err.message });
  }
});

module.exports = router;
