const express = require("express");

const router = express.Router();

const {
    getDashboardStats,
    getStudentDashboard
} = require("../controllers/dashboardController");

const protect =
    require("../middleware/authMiddleware");

const admin =
    require("../middleware/adminMiddleware");

router.get(
    "/",
    protect,
    admin,
    getDashboardStats
);


router.get(
    "/student",
    protect,
    getStudentDashboard
);

module.exports = router;