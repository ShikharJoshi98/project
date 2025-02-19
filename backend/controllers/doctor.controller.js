import { AppointmentDoctor } from "../models/AppointmentModel.js";
import { Employee } from "../models/EmployeeModel.js";
import { Homeo } from "../models/HomeobhagwatModel.js";
import { LeaveApplication } from "../models/LeaveApplyModel.js";
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
        
        const tasks = await Task.find()
        res.json({
            success: true,
            tasks
        })
    } catch (error) {
      res.json({error:error.message})        
    }
}
export const DeleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            res.json({success:false,message:"Task not found"})
        }
        res.json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
        res.json({ error: error.message });
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
export const leaveDetails = async (req, res) => {
    try {
        const leaves = await LeaveApplication.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            leaves
        })
    } catch (error) {
        res.json({
            success:false,message:error.message
        })
    }
}
export const updateleave= async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedleave = await LeaveApplication.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );
        if (!updatedleave) {
            res.json({
                success:false,message:"Failed in updating status"
            })
        }
        res.json({
            success: true,
            updatedleave
        })
    } catch (error) {
        res.json({
            success:false,message:error.message
        })
    }
}
export const AppointmentDoc = async (req, res) => {
    try {
        let { AppointmentDate, Time, PatientCase, Doctor, AppointmentType } = req.body;
        console.log("Incoming Data:", req.body);

       
        const newAppointment = new AppointmentDoctor({
            AppointmentDate, Time, PatientCase, Doctor, AppointmentType
        })
        
        await newAppointment.save();
        res.json({
            success: true,
            newAppointment
        })
    } catch (error) {
        res.json({
            success: false,
            message:error.message
        })
    }
}

export const HomeoBhagwat = async (req, res) => {
    
    try {
        const { name, description, section } = req.body;
    const newInfo = new Homeo({
        name,
        description,
        section
    })
        await newInfo.save();
        res.json({
            success: true,
            newInfo
        })
    } catch (error) {
        res.json({
            success: false,
            error:error.message
        })
    }
}
export const getHomeoBhagwat = async (req, res) => {
    
    try {
        const Info = await Homeo.find();
        res.json({
            success: true,
            Info
        })
    } catch (error) {
        res.json({
            success: false,
            error:error.message
        })
    }
}
export const updateHomeoBhagwat = async (req, res) => {
    
    try {
        const {id} = req.params;
        const { name, description } = req.body;

        const UpdatedInfo = await Homeo.findByIdAndUpdate(
            id,
            { name,description },
            { new: true, runValidators: true }
        );
        res.json({
            success: true,
            UpdatedInfo
        })
    } catch (error) {
        res.json({
            success: false,
            error:error.message
        })
    }
}