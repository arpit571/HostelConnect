const Complaint = require("../models/Complaint");
const generateTrackingId = require("../utils/generateTrackingId");
const serializeComplaint = require("../utils/complaintSerializer");


const getComplaints = async (req, res) => {
    try {

        let complaints;

        if (req.user.role === "admin") {

            complaints = await Complaint.find()
                .populate("student", "name email role");

        } else {

            complaints = await Complaint.find({
                student: req.user.id
            }).populate(
                "student",
                "name email role"
            );

        }

        const serializedComplaints = complaints.map(
            complaint =>
                serializeComplaint(complaint, req.user)
        );

        res.status(200).json(serializedComplaints);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


const createComplaint = async (req, res) => {

    try {

        const {
            title,
            description,
            category,
            priority,
            summary,
            privacyLevel
        } = req.body;


        if (!title) {

            return res.status(400).json({
                message: "Title is required"
            });

        }


        if (!description) {

            return res.status(400).json({
                message: "Description is required"
            });

        }


        const sensitiveCategories = [
            "harassment",
            "ragging",
            "safety"
        ];


        const isSensitive =
            sensitiveCategories.includes(category);


        const existingComplaint =
            await Complaint.findOne({
                title,
                student: req.user.id
            });


        if (existingComplaint) {

            return res.status(400).json({
                message:
                    "Complaint already submitted"
            });

        }


        const complaint =
            await Complaint.create({

                title,

                description,

                category:
                    category || "normal",

                priority,

                summary,

                student:
                    req.user.id,

                privacyLevel:
                    privacyLevel || "normal",

                isSensitive,

                trackingId:
                    generateTrackingId(),

                status:
                    "submitted",

                statusHistory: [
                    {
                        status: "submitted",
                        changedBy: req.user.id,
                        note: "Complaint submitted"
                    }
                ]

            });


        const serializedComplaint =
            serializeComplaint(
                complaint,
                req.user
            );


        res.status(201).json(
            serializedComplaint
        );


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


const updateComplaintStatus = async (req, res) => {

    try {

        const {
            status,
            note
        } = req.body;


        const allowedStatuses = [
            "submitted",
            "under_review",
            "in_progress",
            "resolved",
            "closed"
        ];


        if (
            !status ||
            !allowedStatuses.includes(status)
        ) {

            return res.status(400).json({
                message:
                    "Invalid complaint status"
            });

        }


        const complaint =
            await Complaint.findById(
                req.params.id
            );


        if (!complaint) {

            return res.status(404).json({
                message:
                    "Complaint not found"
            });

        }


        if (complaint.status === status) {

            return res.status(400).json({
                message:
                    "Complaint is already in this status"
            });

        }


        const statusOrder = [
            "submitted",
            "under_review",
            "in_progress",
            "resolved",
            "closed"
        ];


        const currentIndex =
            statusOrder.indexOf(
                complaint.status
            );


        const newIndex =
            statusOrder.indexOf(status);


        if (
            currentIndex === -1 ||
            newIndex !== currentIndex + 1
        ) {

            return res.status(400).json({
                message:
                    `Invalid status transition from ${complaint.status} to ${status}`
            });

        }


        complaint.status = status;


        complaint.statusHistory.push({

            status,

            changedBy:
                req.user.id,

            note

        });


        await complaint.save();


        const serializedComplaint =
            serializeComplaint(
                complaint,
                req.user
            );


        res.status(200).json({

            message:
                "Complaint status updated successfully",

            complaint:
                serializedComplaint

        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


const deleteComplaint = async (req, res) => {

    try {

        const complaint =
            await Complaint.findById(
                req.params.id
            );


        if (!complaint) {

            return res.status(404).json({
                message:
                    "Complaint not found"
            });

        }


        await complaint.deleteOne();


        res.status(200).json({
            message:
                "Complaint deleted successfully"
        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


module.exports = {

    getComplaints,

    createComplaint,

    updateComplaintStatus,

    deleteComplaint

};