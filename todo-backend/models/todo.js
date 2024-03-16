const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3, maxlength: 200 },
  body: String,
  status: String,
  dueDate: { type: Date, default: new Date() },
});

const Todo = mongoose.model("Todo", todoSchema);

exports.Todo = Todo;
