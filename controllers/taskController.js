const Task = require("../models/Task");

// Create Task
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      user: req.user.id
    });

    res.status(201).json({
      message: "Task Created",
      task
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get My Tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Task Updated",
      task
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    res.status(200).json({
      message: "Task Deleted"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};