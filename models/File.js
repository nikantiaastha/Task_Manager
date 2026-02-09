const mongoose = require("mongoose");
const FileSchema = new mongoose.Schema({
  name: String,
  path: String, 
  isFolder: { type: Boolean, default: false },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "File", default: null },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});
module.exports = mongoose.model("File", FileSchema);