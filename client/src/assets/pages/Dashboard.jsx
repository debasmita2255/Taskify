import React, { useEffect, useState } from "react";
import Header from "../components/Dashboard/Header";
import AddTask from "../components/Dashboard/AddTask";
import StackTitle from "../components/Dashboard/StackTitle";
import YetToStart from "../components/Dashboard/YetToStart";
import InProgress from "../components/Dashboard/InProgress";
import Completed from "../components/Dashboard/Completed";
import EditTask from "../components/Dashboard/EditTask";
import api from "../../api";

const Dashboard = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [Tasks, setTasks] = useState();
  const [taskTrigger, setTaskTrigger] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTaskData, setEditTaskData] = useState();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await api.get("/userDetails", {
          withCredentials: true,
        });
        setTasks(res.data.tasks);
      } catch (error) {
        console.log(`Error in pages/Dashboard: ${error}`);
      }
    };
    fetchUserDetails();
  }, [taskTrigger]);

  return (
    <div className="w-full relative">
      <div className="bg-white">
        <Header setShowAddModal={setShowAddModal} />
      </div>

      <div className="px-12 py-4 flex gap-12 bg-zinc-100 min-h-[89vh] max-h-auto">
        <div className="w-1/3">
          <StackTitle title={"Yet To Start"} />
          <div className="pt-2">
            {Tasks && (
              <YetToStart
                setShowEditModal={setShowEditModal}
                setEditTaskData={setEditTaskData}
                tasks={Tasks.yetToStart}
              />
            )}
          </div>
        </div>
        <div className="w-1/3">
          <StackTitle title={"In Progress"} />
          <div className="pt-2">
            {Tasks && (
              <InProgress
                setShowEditModal={setShowEditModal}
                setEditTaskData={setEditTaskData}
                tasks={Tasks.inProgress}
              />
            )}
          </div>
        </div>
        <div className="w-1/3">
          <StackTitle title={"Completed"} />
          <div className="pt-2">
            {Tasks && (
              <Completed
                setShowEditModal={setShowEditModal}
                setEditTaskData={setEditTaskData}
                tasks={Tasks.completed}
              />
            )}
          </div>
        </div>
      </div>

      {showAddModal && (
        <>
          <div className="w-full h-screen fixed top-0 left-0 bg-slate-700 opacity-85 z-40"></div>
          <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center z-50">
            <AddTask
              setShowAddModal={setShowAddModal}
              setTaskTrigger={setTaskTrigger}
            />
          </div>
        </>
      )}

      {showEditModal && (
        <>
          <div className="w-full h-screen fixed top-0 left-0 bg-slate-700 opacity-85 z-40"></div>
          <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center z-50">
            <EditTask
              taskData={editTaskData}
              setShowEditModal={setShowEditModal}
              setTaskTrigger={setTaskTrigger}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
