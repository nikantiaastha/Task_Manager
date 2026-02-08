const mongoose = require("mongoose");
const FileSchema = new mongoose.Schema({
  name: String,
  path: String, // File location in storage
  isFolder: { type: Boolean, default: false },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "File", default: null }, // Self-referencing for subfolders
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});
module.exports = mongoose.model("File", FileSchema);