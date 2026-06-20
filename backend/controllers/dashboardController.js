const Complaint = require("../models/Complaint");
const User = require("../models/User");
const Notice = require("../models/Notice");

const getDashboardStats = async (req, res) => {

    try {

        const totalComplaints =
            await Complaint.countDocuments();

        const pendingComplaints =
            await Complaint.countDocuments({
                status: "Pending"
            });

        const resolvedComplaints =
            await Complaint.countDocuments({
                status: "Resolved"
            });

        const inProgressComplaints =
            await Complaint.countDocuments({
                status: "In Progress"
            });

        const totalStudents =
            await User.countDocuments({
                role: "student"
            });

        const totalNotices =
            await Notice.countDocuments();

        res.status(200).json({
            totalComplaints,
            pendingComplaints,
            resolvedComplaints,
            inProgressComplaints,
            totalStudents,
            totalNotices
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const getStudentDashboard = async (req, res) => {

    try {

        const myComplaints =
            await Complaint.countDocuments({
                student: req.user.id
            });

        const pending =
            await Complaint.countDocuments({
                student: req.user.id,
                status: "Pending"
            });

        const resolved =
            await Complaint.countDocuments({
                student: req.user.id,
                status: "Resolved"
            });

        const inProgress =
            await Complaint.countDocuments({
                student: req.user.id,
                status: "In Progress"
            });

        const recentComplaints =
            await Complaint.find({
                student: req.user.id
            })
            .sort({
                createdAt: -1
            })
            .limit(5);

        res.status(200).json({
            myComplaints,
            pending,
            resolved,
            inProgress,
            recentComplaints
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getDashboardStats,
    getStudentDashboard
};