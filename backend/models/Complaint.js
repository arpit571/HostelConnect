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
      enum: [
        "submitted",
        "under_review",
        "in_progress",
        "resolved",
        "closed"
      ],
      default: "submitted"
    },

    statusHistory: [
      {
        status: {
          type: String,
          enum: [
            "submitted",
            "under_review",
            "in_progress",
            "resolved",
            "closed"
          ],
          required: true
        },

        changedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
        },

        note: {
          type: String
        },

        changedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],

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