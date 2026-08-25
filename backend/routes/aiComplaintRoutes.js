const express = require("express");

const {
  analyzeComplaintController,
} = require("../controllers/aiComplaintController");

const router = express.Router();

router.post(
  "/analyze-complaint",
  analyzeComplaintController
);

module.exports = router;