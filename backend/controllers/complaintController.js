const Complaint = require("../models/Complaint");

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

        res.status(200).json(complaints);

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
      sensitive
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

    const existingComplaint = await Complaint.findOne({
      title,
      student: req.user.id
    });

    if (existingComplaint) {
      return res.status(400).json({
        message: "Complaint already submitted"
      });
    }

    const complaint = await Complaint.create({
      title,
      description,
      category,
      priority,
      summary,
      sensitive,
      student: req.user.id,
      status: "submitted",
      statusHistory: [
        {
          status: "submitted",
          changedBy: req.user.id,
          note: "Complaint submitted"
        }
      ]
    });

    res.status(201).json(complaint);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updateComplaintStatus = async (req, res) => {
    try {
        const { status, note } = req.body;

        const allowedStatuses = [
            "submitted",
            "under_review",
            "in_progress",
            "resolved",
            "closed"
        ];

        if (!status || !allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid complaint status"
            });
        }

        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found"
            });
        }

        if (complaint.status === status) {
            return res.status(400).json({
                message: "Complaint is already in this status"
            });
        }

        const statusOrder = [
            "submitted",
            "under_review",
            "in_progress",
            "resolved",
            "closed"
        ];

        const currentIndex = statusOrder.indexOf(
            complaint.status
        );

        const newIndex = statusOrder.indexOf(status);

        if (
            currentIndex === -1 ||
            newIndex !== currentIndex + 1
        ) {
            return res.status(400).json({
                message: `Invalid status transition from ${complaint.status} to ${status}`
            });
        }

        complaint.status = status;

        complaint.statusHistory.push({
            status,
            changedBy: req.user.id,
            note
        });

        await complaint.save();

        res.status(200).json({
            message: "Complaint status updated successfully",
            complaint
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