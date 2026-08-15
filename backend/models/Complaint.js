const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    status: {
      type: String,
      default: "Pending"
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

        privacyLevel: {
      type: String,
      enum: ["normal", "private", "confidential", "anonymous"],
      default: "normal"
    },

    trackingId: {
      type: String,
      unique: true
    },

    isSensitive: {
      type: Boolean,
      default: false
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