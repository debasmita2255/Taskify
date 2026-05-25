import api from "../../../api";
import React, { useState } from "react";

const EditTask = ({ taskData, setShowEditModal, setTaskTrigger }) => {
  // Values is an object that handles all input fields
  const [Values, setValues] = useState({
    title: taskData.title,
    description: taskData.description,
    priority: taskData.priority,
    status: taskData.status,
  });

  // universal input change function
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const editTask = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(
        `/editTask/${taskData._id}`,
        Values,
        { withCredentials: true },
        // ensures that the user's secret authentication cookie is sent along with the task, so the backend knows who is adding the task.
      );

      alert(res.data.success);
      setTaskTrigger((prev) => !prev);
      setShowEditModal(false);
    } catch (error) {
      alert(error.response?.data?.error || "An error occurred");
    }
  };

  const deleteTask = async (e) => {
    e.preventDefault();
    try {
      const res = await api.delete(`/deleteTask/${taskData._id}`, {
        withCredentials: true,
      });

      alert(res.data.success);
      setTaskTrigger((prev) => !prev);
      setShowEditModal(false);
    } catch (error) {
      alert(error.response?.data?.error || "Failed to delete task");
    }
  };

  return (
    <div className="bg-white rounded px-4 py-4 w-[40%]">
      <h1 className="text-center font-semibold text-xl">Edit Task</h1>
      <hr className="mb-4 mt-2" />
      <form className="flex flex-col gap-4">
        <input
          type="text"
          className="border px-2 py-1 rounded border-zinc-300 outline-none"
          placeholder="Title"
          name="title"
          value={Values.title}
          onChange={change}
        />

        <div className="flex items-center justify gap-4">
          <div className="w-full">
            <h3 className="mb-2">Select Priority</h3>
            <select
              name="priority"
              id=""
              className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
              value={Values.priority}
              onChange={change}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="w-full">
            <h3 className="mb-2">Select Status</h3>
            <select
              name="status"
              id=""
              className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
              value={Values.status}
              onChange={change}
            >
              <option value="yetToStart">Yet To Start</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <textarea
          name="description"
          id=""
          placeholder="Description"
          className="border px-1 py-1 rounded border-zinc-300 outline-none h-[25vh]"
          value={Values.description}
          onChange={change}
        ></textarea>

        <div className="flex items-center justify gap-4">
          <button
            type="submit"
            className="w-full bg-blue-800 py-2 hover:bg-blue-700 transition-all duration-300 text-white rounded"
            onClick={editTask}
          >
            Update Task
          </button>

          <button
            type="button"
            className="w-full border border-red-600 text-red-600 py-2 hover:bg-red-100 transition-all duration-300 rounded"
            onClick={deleteTask}
          >
            Delete Task
          </button>

          <button
            type="button"
            className="w-full border border-black py-2 hover:bg-zinc-100 transition-all duration-300 rounded"
            onClick={(e) => {
              e.preventDefault();
              window.sessionStorage.clear("editTaskId");
              setShowEditModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
