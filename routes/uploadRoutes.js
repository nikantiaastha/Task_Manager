const express = require("express");
const multer = require("multer");
const router = express.Router();
const File = require(".../models/File");
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });


router.post("/", auth, upload.single("file"), async (req, res) => {
  const newFile = new File({
    name: req.file.originalname,
    path: req.file.path,
    isFolder: false,
    parentId: req.body.parentId || null,
    userId: req.user.id
  });
  await newFile.save();
  res.json(newFile);
});


router.post("/folder", auth, async (req, res) => {
  const folder = new File({
    name: req.body.name,
    isFolder: true,
    parentId: req.body.parentId || null,
    userId: req.user.id
  });
  await folder.save();
  res.json(folder);
});

module.exports = router;