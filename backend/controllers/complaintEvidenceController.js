const Complaint = require("../models/Complaint");
const ComplaintEvidence = require("../models/ComplaintEvidence");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// Upload buffer to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "hostelconnect/complaint-evidence",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// Upload complaint evidence
const uploadEvidence = async (req, res) => {
  try {
    // 1. Find complaint
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    // 2. Get logged-in user
    const userId = req.user.id;

    // 3. Check complaint ownership
    if (complaint.student.toString() !== userId.toString()) {
      return res.status(403).json({
        message:
          "You are not authorized to add evidence to this complaint",
      });
    }

    // 4. Check uploaded file
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload an image",
      });
    }

    // 5. Upload image to Cloudinary
    const result = await uploadToCloudinary(
      req.file.buffer
    );

    // 6. Save evidence metadata
    const evidence = await ComplaintEvidence.create({
      complaint: complaint._id,
      url: result.secure_url,
      publicId: result.public_id,
      fileType: req.file.mimetype,
      uploadedBy: userId,
    });

    // 7. Return success
    return res.status(201).json({
      message: "Evidence uploaded successfully",
      evidence,
    });
  } catch (error) {
    console.error("Evidence upload error:", error);

    return res.status(500).json({
      message: "Failed to upload evidence",
      error: error.message,
    });
  }
};

module.exports = {
  uploadEvidence,
};