const {
  analyzeComplaint,
} = require("../services/aiComplaintService");

const analyzeComplaintController = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!description || !description.trim()) {
      return res.status(400).json({
        message: "Complaint description is required",
      });
    }

    const analysis = await analyzeComplaint({
      title,
      description,
    });

    res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
  console.error("AI complaint analysis error:", error);

  res.status(500).json({
    success: false,
    message: "Unable to analyze complaint",
    error: error.message,
  });
}
};

module.exports = {
  analyzeComplaintController,
};