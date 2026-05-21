const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 1. THE SCHEMA: Defining the rules for a task
const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
        enum: ["low", "medium", "high"],
        default: "low",
    },
    status: {
        type: String,
        required: true,
        enum: ["yetToStart", "inProgress", "completed"],
        default: "yetToStart",
    },
});


// 2. THE MODEL: Compiling the schema into a usable tool
// We name the model "Task", and pass it the rules from "taskSchema"
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
