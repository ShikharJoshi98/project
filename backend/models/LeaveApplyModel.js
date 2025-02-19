import mongoose from 'mongoose';

const LeaveSchema = new mongoose.Schema({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    username: { type: String, required: true },
    status: {type:String, default:'PENDING'}

}, { timestamps: true })

export const LeaveApplication = mongoose.model('LeaveApplication', LeaveSchema); 