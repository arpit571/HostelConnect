const express = require("express");

const router = express.Router();

const {
  createNotice,
  getNotices,
  deleteNotice
} = require("../controllers/noticeController");

const protect =
require("../middleware/authMiddleware");

const admin =
require("../middleware/adminMiddleware");

router.post(
  "/",
  protect,
  admin,
  createNotice
);

router.get(
  "/",
  protect,
  getNotices
);

router.delete(
  "/:id",
  protect,
  admin,
  deleteNotice
);

module.exports = router;