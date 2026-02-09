const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");


router.post("/", auth, async (req, res) => {
  const task = new Task({ ...req.body, userId: req.user.id });
  await task.save();
  res.json(task);});

router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
});


router.get("/stats/category", auth, async (req, res) => {
  const stats = await Task.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } },
    { $group: { _id: "$category", count: { $sum: 1 } } }
]);
  res.json(stats);
}); 


router.get("/stats/status", auth, async (req, res) => {
  const stats = await Task.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } },
    { $group: { _id: "$status", count: { $sum: 1 } } }
  ]);
  res.json(stats);
});

module.exports = router;