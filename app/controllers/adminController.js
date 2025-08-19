import { taskModel } from "../models/taskModel.js";


export const getAllTasks = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }

    const tasks = await taskModel.find().populate("userId", "fullName email");

    res.status(200).json({
      success: true,
      tasks,
      message: "All tasks fetched successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch tasks",
      error: error.toString(),
    });
  }
};
