import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskSummary = () => {
  const [taskStats, setTaskStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });



  const fetchTaskStats = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/tasks`, { withCredentials: true });
      if (res.data && res.data.tasks) {
        const tasks = res.data.tasks;
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.status === 'completed').length;
        const pendingTasks = tasks.filter(task => task.status === 'pending').length;

        // Update the task stats state
        setTaskStats({
          totalTasks,
          completedTasks,
          pendingTasks,
        });
      }
    } catch (error) {
      console.error('Error fetching task stats:', error);
    }
  };
  // Fetch task data from the backend
  useEffect(() => {
    

    fetchTaskStats();
  }, []);

  return (
    <div className="task-summary mt-12 mx-12">
      {/* Task Summary Container */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Row 1: Total Tasks */}
          <div className="flex justify-center items-center bg-gray-100 p-4 rounded-md">
            <div>
              <h3 className="text-xl font-semibold">Total Tasks</h3>
              <p className="text-2xl font-bold">{taskStats.totalTasks}</p>
            </div>
          </div>

          {/* Row 2: Completed Tasks */}
          <div className="flex justify-center items-center bg-green-100 p-4 rounded-md">
            <div>
              <h3 className="text-xl font-semibold">Completed Tasks</h3>
              <p className="text-2xl font-bold text-green-600">{taskStats.completedTasks}</p>
            </div>
          </div>

          {/* Row 3: Pending Tasks */}
          <div className="flex justify-center items-center bg-red-100 p-4 rounded-md">
            <div>
              <h3 className="text-xl font-semibold">Pending Tasks</h3>
              <p className="text-2xl font-bold text-red-600">{taskStats.pendingTasks}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskSummary;
