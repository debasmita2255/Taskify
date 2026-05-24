import React from "react";

const TaskCard = ({ data, setShowEditModal, setEditTaskData }) => {
  let colorClasses = "text-red-500 bg-red-100";

  if (data.priority === "low") {
    colorClasses = "text-green-500 bg-green-100";
  } else if (data.priority === "medium") {
    colorClasses = "text-yellow-500 bg-yellow-100";
  }

  const displayEditModal = (e, data) => {
    e.preventDefault();
    setEditTaskData(data);
    setShowEditModal(true);
  };

  return (
    <button
      className="bg-white rounded my-2 px-4 w-full py-2 hover:shadow transition-all duration-300"
      onClick={(event) => displayEditModal(event, data)}
    >
      <div className="flex items-center justify-between">
        <h1 className="">{data.title}</h1>

        <div className={`text-sm px-2 py-1 rounded ${colorClasses}`}>
          <p>{data.priority}</p>
        </div>
      </div>
      <hr className="my-2" />
      <p className="text-sm text-zinc-500 text-start">{data.description}</p>
    </button>
  );
};

export default TaskCard;
