import express from "express";
const router = express.Router();
import * as userController from "../app/controllers/userController.js";
import * as taskController from "../app/controllers/taskController.js";
import authMiddleware from "../app/middlewares/authMiddleware.js";
import * as adminController from "../app/controllers/adminController.js";


// user 
router.post("/register", userController.register);
router.post("/login", userController.login);





//todo 
router.post("/createTodo", authMiddleware, taskController.createTodo);
router.delete("/deleteTodo/:id",authMiddleware, taskController.deleteTask);
router.put("/updateTodo/:id", authMiddleware, taskController.updateTask);
router.get("/listStatusTodo/:id",authMiddleware, taskController.listStatusTask);



//admin
router.get("/admin/tasks", authMiddleware, adminController.getAllTasks);


export default router;
