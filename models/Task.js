const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: { 
    type: String, 
    enum: ["Study", "Sports", "Leisure", "Food", "Entertainment"], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ["ToDo", "In-Progress", "Done"], 
    default: "ToDo" 
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});
module.exports = mongoose.model("Task", TaskSchema);