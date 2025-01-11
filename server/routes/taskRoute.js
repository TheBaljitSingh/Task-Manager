import  { createTask, updateTask, deleteTask, getAllTasks, getDashboardStats } from "../controller/taskController.js";
import  { isAuthenticatedUser } from "../middleware/auth.js"; // Ensure user is authenticated

import express from "express";

const router = express.Router();


router.route("/tasks").post(isAuthenticatedUser, createTask).get(isAuthenticatedUser, getAllTasks);
router.route("/tasks/:id").put(isAuthenticatedUser, updateTask).delete(isAuthenticatedUser, deleteTask);
router.route("/tasks/stats").get(isAuthenticatedUser, getDashboardStats);

export default router;
