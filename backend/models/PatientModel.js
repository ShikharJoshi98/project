import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    phone: { type: String, required: true },
    Altphone: { type: String },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    lastLogin: {type:Date, default: Date.now()},
    password: { type: String, required: true },
    branch: { type: String, required: true },
    role: {
        type: String,
        required:true,
        default: "patient"
    },
   
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    
} ,{ timestamps: true });

const Patient = mongoose.model('Patient', PatientSchema);
export default Patient