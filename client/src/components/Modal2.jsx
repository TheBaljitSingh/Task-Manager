import { useEffect } from 'react';

const Modal2 = ({ isOpen, newTask, setNewTask, updateTask, onClose }) => {
  if (!isOpen) return null; // If modal is not open, don't render anything

  // No need to reset the form here, as newTask is already managed by the parent component

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask(newTask); // Call update task function with the updated task data
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
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
        </form>
      </div>
    </div>
  );
};

export default Modal2;
