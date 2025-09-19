const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Event date is required"],
    },
    venue: {  // Changed from "location" to "venue" as per requirements
      type: String,
      required: [true, "Event venue is required"],
      trim: true,
    },
    capacity: {
      type: Number,
      required: [true, "Event capacity is required"],
      min: [1, "Capacity must be at least 1"],
    },
    status: {
      type: String,
      enum: {
        values: ['draft', 'published', 'cancelled'],
        message: 'Status must be either draft, published, or cancelled'
      },
      default: 'draft',
    },
  },
  {
    timestamps: true, // This will automatically add createdAt and updatedAt
  }
);

module.exports = mongoose.model("Event", EventSchema);