const task = require("../models/tasks");

// adding a new task
const addTask = async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;
    const user = req.user;

    if (!title || !description)
      return res.status(400).json({ error: "All fields are required!" });

    if (!title.trim() || !description.trim()) {
      return res
        .status(400)
        .json({ error: "Title and description cannot be empty!" });
    }

    const newTask = new task({ title, description, priority, status });
    await newTask.save();
    user.tasks.push(newTask._id);
    await user.save();

    return res.status(200).json({ success: "Task added" });
  } catch (error) {
    console.log(`Error in services/task: ${error}`);
    return res.status(404).json({ error: "Internal server error" });
  }
};

// edit task
const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status } = req.body;

    if (!title || !description)
      return res.status(400).json({ error: "All fields are required!" });

    if (!title.trim() || !description.trim()) {
      return res
        .status(400)
        .json({ error: "Title and description cannot be empty!" });
    }

    await task.findByIdAndUpdate(id, { title, description, priority, status });
    return res.status(200).json({ success: "Task updated" });
  } catch (error) {
    console.log(`Error in services/task: ${error}`);
    return res.status(404).json({ error: "Internal server error" });
  }
};

//get task (only one)
const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskDetails = await task.findById(id);

    return res.status(200).json({ taskDetails });
  } catch (error) {
    console.log(`Error in services/task: ${error}`);
    return res.status(404).json({ error: "Internal server error" });
  }
};

// delete task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    // deleting the task
    await task.findByIdAndDelete(id);

    // remove the task ID from the user's array
    user.tasks.pull(id);
    await user.save();

    return res.status(200).json({ success: "Task deleted" });
  } catch (error) {
    console.log(`Error in services/task: ${error}`);
    return res.status(404).json({ error: "Internal server error" });
  }
};

module.exports = { addTask, editTask, getTask, deleteTask };
