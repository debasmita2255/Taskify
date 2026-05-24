import React from "react";
import TaskCard from "./TaskCard";

const YetToStart = ({ setShowEditModal, setEditTaskData, tasks }) => {
  return (
    <div className="flex flex-col gap-2">
      {tasks &&
        tasks.map((items, i) => (
          <TaskCard
            key={i}
            data={items}
            setShowEditModal={setShowEditModal}
            setEditTaskData={setEditTaskData}
          />
        ))}
    </div>
  );
};

export default YetToStart;
