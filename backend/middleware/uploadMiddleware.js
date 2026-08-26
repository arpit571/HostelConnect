const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {


    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
    ];

    const allowedExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
    ];

    const extension = path.extname(file.originalname).toLowerCase();

    if (
        allowedTypes.includes(file.mimetype) ||
        allowedExtensions.includes(extension)
    ) {
        cb(null, true);
    } else {
        cb(
            new Error("Only JPG, JPEG, PNG and WEBP images are allowed"),
            false
        );
    }
};

const upload = multer({
    storage,

    limits: {
        fileSize: 5 * 1024 * 1024,
    },

    fileFilter,
});

module.exports = upload;