import mongoose from 'mongoose';

const LeaveSchema = new mongoose.Schema({
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    reason: { type: String, required: true },
    duration: { type: Number, required: true },
    username: { type: String, required: true },
    status: {type:String, default:'PENDING'}

}, { timestamps: true })

export const LeaveApplication = mongoose.model('LeaveApplication', LeaveSchema); 