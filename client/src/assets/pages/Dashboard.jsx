import React, { useState } from "react";
import Header from "../components/Dashboard/Header";
import AddTask from "../components/Dashboard/AddTask";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full relative">
      <div className="bg-white">
        <Header setIsModalOpen={setIsModalOpen} />
      </div>

      {isModalOpen && (
        <>
          <div className="w-full h-screen fixed top-0 left-0 bg-slate-700 opacity-85 z-40"></div>
          <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center z-50">
            <AddTask setIsModalOpen={setIsModalOpen} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
