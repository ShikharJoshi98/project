import { Employee } from "../models/EmployeeModel.js";
import { Task } from "../models/TaskModel.js";

export const assignTask = async (req, res) => {
    
    try {
        const { task, username } = req.body;
        const employeeExists = await Employee.findOne({username});
        if (!employeeExists) {
            res.json({ success: false, message: "employee does not exist" });
        }
        const newTask = new Task({
            task,
            username
        })
        await newTask.save();  
        res.json({
            success: true,
            newTask
        })
    } catch (error) {
        res.json({error:error.message})
    }
}
export const taskDetails = async (req, res) => {
    try {
        const { username } = req.params; 
        const tasks = await Task.find({ username })
        res.json({
            success: true,
            tasks
        })
    } catch (error) {
      res.json({error:error.message})        
    }
}

export const updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.body;

        const task = await Task.findByIdAndUpdate(
            id, 
            { status: "COMPLETED" }, 
            { new: true, runValidators: true } 
        );
        res.json({
            success: true,
            task
        })
    } catch (error) {
      res.json({error:error.message})        
    }
}