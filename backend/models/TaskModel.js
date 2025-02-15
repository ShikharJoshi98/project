import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    task: { type: String, required: true },
    username: { type: String,   required: true},
    AssignedOn: { type: Date, default: Date.now() },
    status: {type:String,default:"INCOMPLETE"}
})

export const Task = mongoose.model("Task", taskSchema);