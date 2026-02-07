const express = require("express"); // Fixed
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), (req, res) => {
    res.json({
        message: "File Uploaded Success",
        file: req.file,
    });
});

module.exports = router; // Fixed