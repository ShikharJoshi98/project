import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    fullname: { type: String },
    username: { type: String, required: true },
    email: { type: String, required: true},
    phone: { type: String, required: true },   
    aadharCard: { type: String },
    panCard: { type:String },
    age: { type: Number },
    gender: { type: String },
    bloodGroup: { type: String },
    address: { type: String },
    department: { type: String },
    Salary: { type: Number },
    attendance: { type: Number },
    status: { type: String },
    password: { type: String, required: true },
    branch: { type: String, required: true },
    role: {
        type: String,
        enum:['hr','receptionist','doctor'],
        required:true,
    },
    
})

export const Employee = mongoose.model('Employee', EmployeeSchema);

