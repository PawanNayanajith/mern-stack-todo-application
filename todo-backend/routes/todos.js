const auth = require("../middleware/auth");
const { Todo } = require("../models/todo");
const express = require("express");
const router = express.Router();

// Get counts of todo tasks by status
router.get("/todoCounts", async (req, res) => {
  try {
    const todoCounts = await Todo.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    const countsMap = {};
    todoCounts.forEach(count => {
      countsMap[count._id] = count.count;
    });
    res.json({ status: "success", counts: countsMap });
  } catch (error) {
    console.error("Error fetching todo counts:", error);
    res.status(500).json({ status: "failure", message: "Error fetching todo counts" });
  }
});

// GET overdue tasks
router.get('/overdueTasks', async (req, res) => {
  try {
    // Find tasks where the due date is in the past and the status is not "Done"
    const overdueTasks = await Todo.find({ dueDate: { $lt: new Date() }, status: { $ne: "Done" } });
    res.json({ status: "success", overdueTasks });
  } catch (error) {
    console.error("Error fetching overdue tasks:", error);
    res.status(500).json({ status: "failure", message: "Error fetching overdue tasks" });
  }
});

router.get("/", auth, async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res.send(todos);
  } catch (error) {
    res.status(500)
      .json({
        status: "failure",
        message: error.message,
      });
  }
});

router.post("/", auth, async (req, res) => {
  const { title, body, status, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({
      status: "failure",
      message: "Title is required"
    });
  }

  const todo = new Todo({ title, body, status, dueDate });

  try {
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: error.message,
    });
  }
});

router.put("/:id", auth, async (req, res) => {
  const { title, body, status, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({
      status: "failure",
      message: "Title is required"
    });
  }

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, body, status, dueDate },
      { new: true }
    );
    res.send(updatedTodo);
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: error.message
    });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    res.send(deletedTodo);
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: error.message
    });
  }
});

module.exports = router;
