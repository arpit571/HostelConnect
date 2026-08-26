const express = require("express");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

const {
  getComplaints,
  createComplaint,
  updateComplaintStatus,
  deleteComplaint
} = require("../controllers/complaintController");

router.get("/", protect, getComplaints);

router.post("/", protect, createComplaint);

router.patch("/:id/status", protect, admin, updateComplaintStatus);

router.delete("/:id", protect, admin, deleteComplaint);

module.exports = router;