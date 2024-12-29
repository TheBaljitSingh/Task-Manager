const Task = require("../models/taskModel");
const sendToken = require("../utils/jwtToken");

exports.createTask = async (req, res) => {
    try {
      const { title, startTime,endTime, priority, status } = req.body;

  
      // Validation: Ensure the startTime is before endTime
      if (new Date(startTime) >= new Date(endTime)) {
        return res.status(400).json({ error: "Start time must be before end time" });
      }
  

      const task = await Task.create({
        title,
        startTime,
        endTime,
        priority,
        status,
        userId: req.user.id, // Assuming `req.user.id` is populated by authentication middleware
      });
  
      res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      // If status is being updated to "finished", update the actual endTime
      if (updates.status === "finished") {
        updates.endTime = new Date();
      }
  
      const task = await Task.findByIdAndUpdate(id, updates, { new: true });
  
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
  
      res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  exports.deleteTask = async (req, res) => {
    try {
      const { id } = req.params;
  
      const task = await Task.findByIdAndDelete(id);
  
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
  
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.getAllTasks = async (req, res) => {
    try {
      const { priority, status, sortBy } = req.query;
      const filter = { userId: req.user.id }; // Ensure user gets only their tasks
  
      if (priority) filter.priority = priority;
      if (status) filter.status = status;
  
      const sort = {};
      if (sortBy === "startTime") sort.startTime = 1; // Ascending
      if (sortBy === "endTime") sort.endTime = 1;
  
      const tasks = await Task.find(filter).sort(sort);
  
      res.status(200).json({ tasks });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.getDashboardStats = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const tasks = await Task.find({ userId });
  
      const totalCount = tasks.length;
      const completedCount = tasks.filter((task) => task.status === "finished").length;
      const pendingCount = totalCount - completedCount;
  
      // Calculate percentages
      const completedPercent = ((completedCount / totalCount) * 100).toFixed(2);
      const pendingPercent = ((pendingCount / totalCount) * 100).toFixed(2);
  
      // Calculate pending stats grouped by priority
      const now = new Date();
      const pendingTasks = tasks.filter((task) => task.status === "pending");
      const pendingStats = pendingTasks.reduce(
        (acc, task) => {
          const lapsedTime =
            now > task.startTime ? (now - task.startTime) / (1000 * 60 * 60) : 0; // In hours
          const balanceTime =
            now > task.endTime
              ? 0
              : (task.endTime - now) / (1000 * 60 * 60); // In hours
  
          acc[task.priority] = acc[task.priority] || { lapsed: 0, balance: 0 };
          acc[task.priority].lapsed += lapsedTime;
          acc[task.priority].balance += balanceTime;
  
          return acc;
        },
        {}
      );
  
      // Calculate average completion time
      const completedTasks = tasks.filter((task) => task.status === "finished");
      const averageCompletionTime =
        completedTasks.reduce((sum, task) => {
          return sum + (task.endTime - task.startTime) / (1000 * 60 * 60); // In hours
        }, 0) / completedTasks.length || 0;
  
      res.status(200).json({
        totalCount,
        completedPercent,
        pendingPercent,
        pendingStats,
        averageCompletionTime: averageCompletionTime.toFixed(2),
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
    