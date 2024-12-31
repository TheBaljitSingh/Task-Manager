import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import moment from 'moment/moment';
import Modal from "./Modal.jsx";
import Modal2 from "./Modal2.jsx";
import { AiOutlineEdit } from "react-icons/ai";

export default function TaskList() {
  const [tasks, setTask] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [newTask, setNewTask] = useState({});
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [sorting, setSorting] = useState('None');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/tasks`, { withCredentials: true });
        if (res.data && res.data.tasks) {
          setTask(res.data.tasks);
          setFilteredTasks(res.data.tasks); // Initialize filtered tasks with all tasks
        }
      } catch (error) {
        console.log('Error fetching tasks:', error);
      }
    };
    fetchTask();
  }, []);

  const handleCheckboxChange = (taskId) => {
    setSelectedTasks((prevSelectedTasks) => {
      if (prevSelectedTasks.includes(taskId)) {
        return prevSelectedTasks.filter((id) => id !== taskId);
      } else {
        return [...prevSelectedTasks, taskId];
      }
    });
  };

  const handleDeleteSelected = async () => {
    try {
      const deletePromises = selectedTasks.map((taskId) =>
        axios.delete(`http://localhost:3000/api/v1/tasks/${taskId}`, { withCredentials: true })
      );
      await Promise.all(deletePromises);
      setTask((prevTasks) => prevTasks.filter((task) => !selectedTasks.includes(task._id)));
      setFilteredTasks((prevTasks) => prevTasks.filter((task) => !selectedTasks.includes(task._id)));
      setSelectedTasks([]);
    } catch (error) {
      console.error('Error deleting tasks:', error);
    }
  };

  const handleSortByPriority = () => {
    const sortedTasks = [...filteredTasks].sort((a, b) => a.priority - b.priority);
    setFilteredTasks(sortedTasks);
    setSorting('Priority');
  };

  const handleFilterByStatus = (status) => {
    const filtered = tasks.filter((task) => task.status === status);
    setFilteredTasks(filtered);
    setFilterStatus(status);
  };

  const handleReset = (action) => {
    if (action === 'resetFilters') {
      setFilteredTasks(tasks); // Reset to all tasks
      setFilterStatus('All');
    }
    if (action === 'resetSort') {
      setFilteredTasks([...filteredTasks]); // Reset to previous filtered tasks without sort
      setSorting('None');
    }
  };

  const handleAddButtonClick = () => {
    setIsModalOpen(true); // Open the modal
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleCloseModal2 = () => {
    setIsModalOpen2(false);
  };

  const handleTaskUpdate = (task) => {
    setIsModalOpen2(true);
    setNewTask(task);
  };

  return (
    <div className="flex justify-center">
      <div className="mt-36 mx-12 w-full">
        {/* Add Task, Delete Selected, Sort & Filter Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
          {/* Left side: Add and Delete buttons */}
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 w-full md:w-auto">
            <button
              onClick={handleAddButtonClick}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full md:w-auto"
            >
              Add Task
            </button>
            <button
              onClick={handleDeleteSelected}
              className="bg-red-400 text-black px-4 py-2 rounded hover:bg-red-500 w-full md:w-auto mt-4 md:mt-0"
            >
              Delete Selected
            </button>
          </div>

          {/* Right side: Sort and Filter buttons */}
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 w-full md:w-auto">
            <button
              onClick={handleSortByPriority}
              className="bg-white border border-gray-500 text-black px-4 py-2 rounded hover:bg-gray-100 w-full md:w-auto mb-4 md:mb-0"
            >
              Sort by Priority
            </button>
            <button
              onClick={() => handleFilterByStatus('pending')}
              className="bg-white border  text-xl border-gray-500 text-black px-4 py-2 rounded hover:bg-gray-100 w-full md:w-auto mb-4 md:mb-0"
            >
              Filter by Pending
            </button>
            <button
              onClick={() => handleFilterByStatus('completed')}
              className="bg-white border border-gray-500 text-black px-4 py-2 rounded hover:bg-gray-100 w-full md:w-auto mb-4 md:mb-0"
            >
              Filter by Completed
            </button>
            <select
              className="bg-white border border-gray-500 text-black px-4 py-2 rounded hover:bg-gray-100 w-full md:w-auto"
              onChange={(e) => handleReset(e.target.value)}
            >
              <option value="">Reset Filters or Sort</option>
              <option value="resetFilters">Remove Filter</option>
              <option value="resetSort">Remove Sort</option>
            </select>
          </div>
        </div>

        {/* Table to Display Tasks */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-md mx-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2">Select</th>
                <th className="border px-4 py-2">Task ID</th>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Priority</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Start Time</th>
                <th className="border px-4 py-2">End Time</th>
                <th className="border px-4 py-2">Total Time to Finish (hrs)</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task._id}>
                  <td className="border px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedTasks.includes(task._id)}
                      onChange={() => handleCheckboxChange(task._id)}
                    />
                  </td>
                  <td className="border px-4 py-2">{task._id}</td>
                  <td className="border px-4 py-2">{task.title}</td>
                  <td className="border px-4 py-2">{task.priority}</td>
                  <td className="border px-4 py-2">{task.status}</td>
                  <td className="border px-4 py-2">
                    {moment(task.startTime).format('D MMM YYYY h:mm A')}
                  </td>
                  <td className="border px-4 py-2">
                    {moment(task.endTime).format('D MMM YYYY h:mm A')}
                  </td>
                  <td className="border px-4 py-2">1hr</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleTaskUpdate(task)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <AiOutlineEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
      <Modal2
        isOpen={isModalOpen2}
        newTask={newTask}
        setNewTask={setNewTask}
        onClose={handleCloseModal2}
      />
    </div>
  );
}
