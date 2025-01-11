import mongoose from "mongoose"



const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Task title is required"],
  },
  startTime: {
    type: Date,
    required: [true, "Start time is required"],
  },
  endTime: {
    type: Date,
    required: [true, "End time is required"],
  },
  priority: {
    type: Number,
    required: [true, "Priority is required"],
    enum: [1, 2, 3, 4, 5], // Allowed priority values
  },
  status: {
    type: String,
    required: [true, "Status is required"],
    enum: ["pending", "finished"], // Allowed status values
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
});

export default mongoose.model("Task", taskSchema);
