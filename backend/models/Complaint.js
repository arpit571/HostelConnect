const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    category: {
      type: String,
      enum: [
        "plumbing",
        "electrical",
        "cleanliness",
        "food",
        "maintenance",
        "security",
        "harassment",
        "ragging",
        "noise",
        "accommodation",
        "internet",
        "other"
      ],
      default: "other"
    },

    priority: {
      type: String,
      enum: [
        "low",
        "medium",
        "high",
        "critical"
      ],
      default: "medium"
    },

    summary: {
      type: String
    },

    sensitive: {
      type: Boolean,
      default: false
    },

    status: {
      type: String,
      default: "Pending"
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Complaint",
  complaintSchema
);