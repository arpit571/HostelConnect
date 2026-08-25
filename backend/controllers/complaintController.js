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

    const { title, category, privacyLevel } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
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
        category: category || "normal",
        student: req.user.id,
        privacyLevel: privacyLevel || "normal",
        isSensitive,
        trackingId: generateTrackingId()
    });

    const serializedComplaint =
    serializeComplaint(complaint, req.user);

res.status(201).json(serializedComplaint); 

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const updateComplaintStatus = async (req, res) => {

  try {

    const complaint =
      await Complaint.findById(
        req.params.id
      );

    if (!complaint) {

      return res.status(404).json({
        message: "Complaint not found"
      });

    }

    complaint.status =
      req.body.status;

    await complaint.save();

    res.status(200).json(
      complaint
    );

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
        message: "Complaint not found"
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