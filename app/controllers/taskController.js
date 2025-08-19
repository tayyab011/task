

import { taskModel } from "../models/taskModel.js";

export const createTodo =async(req,res)=>{
try {
    const reqBody = req.body;

reqBody.userId = req.user._id;
 const data=  await taskModel.create(reqBody);
    res.status(200).json({
      success: true,
      reqBody,
      message: "task created successfull",
    });
} catch (error) {
    res.status(400).json({
      success: false,
      message: "task created failed",
      error:error.toString()
    });
}
}

export const deleteTask =async(req,res)=>{
    try {
        const id = req.params.id;

      await taskModel.deleteOne({ _id: id });
        res.status(200).json({
          success: true,
          message: "task delete successfull",
        });
    } catch (error) {
        res.status(400).json({
          success: false,
          message: "task delete failed",
          error:error.toString()
        });
    }
    }
export const updateTask =async(req,res)=>{
    try {
        const id = req.params.id;
      const reqbody =req.body
    const task=  await taskModel.updateOne({_id:id},reqbody);
        res.status(200).json({
          success: true,
          message: "task update successfull",
        });
        
    } catch (error) {
        res.status(400).json({
          success: false,
          message: "task update failed",
          error:error.toString()
        });
    }
    }

export const listStatusTask =async(req,res)=>{
    try {
        const id = req.params.id;
       const email = req.headers.email;
       
  
   const tasks = await taskModel.findOne(
     { _id: id},
     { title: 1, description: 1, status: 1, priority: 1 }
   );
        res.status(200).json({
          success: true,
          tasks,
          message: "task list successfull",
        });
    } catch (error) {
        res.status(400).json({
          success: false,
          message: "task list failed",
          error: error.toString(),
        });
    }
    }

