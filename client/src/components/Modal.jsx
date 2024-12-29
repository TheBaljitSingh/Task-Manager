const Modal = ({ isOpen, newTask, setNewTask, onClose, onAddTask }) => {
    if (!isOpen) return null; // If modal is not open, don't render anything


  
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-md shadow-md w-96">
          <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
  
          {/* Form Fields */}
          <div className="mb-4">
            <label className="block mb-2">Title</label>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Task Title"
            />
          </div>
  
          <div className="mb-4">
            <label className="block mb-2">Priority</label>
            <input
              type="text"
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Priority"
            />
          </div>
  
          <div className="mb-4">
            <label className="block mb-2">Status</label>
            <input
              type="text"
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Status"
            />
          </div>
  
          <div className="mb-4">
            <label className="block mb-2">Start Time</label>
            <input
              type="datetime-local"
              value={newTask.startTime}
              onChange={(e) => setNewTask({ ...newTask, startTime: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
  
          <div className="mb-4">
            <label className="block mb-2">End Time</label>
            <input
              type="datetime-local"
              value={newTask.endTime}
              onChange={(e) => setNewTask({ ...newTask, endTime: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
  
          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={onAddTask}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    );
  };


  export default Modal;
  