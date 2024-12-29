const express = require("express");
const { createTask, updateTask, deleteTask, getAllTasks, getDashboardStats } = require("../controller/taskController");
const { isAuthenticatedUser } = require("../middleware/auth"); // Ensure user is authenticated

const router = express.Router();


router.route("/tasks").post(isAuthenticatedUser, createTask).get(isAuthenticatedUser, getAllTasks);
router.route("/tasks/:id").put(isAuthenticatedUser, updateTask).delete(isAuthenticatedUser, deleteTask);
router.route("/tasks/stats").get(isAuthenticatedUser, getDashboardStats);

module.exports = router;
