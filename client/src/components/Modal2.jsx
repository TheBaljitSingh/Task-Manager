import { useState, useEffect } from 'react';
import axios from 'axios';

const Modal2 = ({ isOpen, onClose, newTask, setNewTask }) => {
  if (!isOpen) return null; // If modal is not open, don't render anything
    const [error, setError] = useState(null);

    const [success, setSuccess] = useState(null);

  // const [newTask, setNewTask] = useState();



  const updateTask = async (task) => {

    console.log("called updateTask")
    try {
      // Prepare the data to update (only send the necessary fields)
     
      // Make the API call to update the task
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND}/api/v1/tasks/${task._id}`,  // Use the task ID
        task,  // Send only the necessary data
        { withCredentials: true }
      );

      
      if (res.status === 200) {


        setSuccess("Task updated successfully")
        
        setTimeout(onClose, 2000);

        
        // setIsModalOpen2(false);  // Close the modal after a successful update
      }
    } catch (error) {
      
      const errorMessage = error.response?.data?.error || "An error occurred while updating the task.";
      setError(errorMessage);

      console.error("Error adding task:", error);

        // setError(error);
        
      // You can show an alert here to notify the user about the error
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting task update:", newTask); // Log task data
    updateTask(newTask);
  };
  



  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <p className='text-xl text-green-500'>{success}</p>
        <h2 className="text-xl font-semibold mb-4">Update Task</h2>


        {/* Form Fields */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Task Title"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Priority</label>
            <input
              type="text"
              name="priority"
              value={newTask.priority}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Priority"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Status</label>
            <input
              type="text"
              name="status"
              value={newTask.status}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Status"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Start Time</label>
            <input
              type="datetime-local"
              name="startTime"
              value={newTask.startTime}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">End Time</label>
            <input
              type="datetime-local"
              name="endTime"
              value={newTask.endTime}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update Task
            </button>
          </div>
          <div className="flex justify-center space-x-4 text-red-500">
              <p>{error}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal2;
