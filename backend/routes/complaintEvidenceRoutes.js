const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  uploadEvidence,
} = require("../controllers/complaintEvidenceController");

router.post(
  "/:id/evidence",
  protect,
  upload.single("evidence"),
  uploadEvidence
);

module.exports = router;