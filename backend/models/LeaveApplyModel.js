import mongoose from 'mongoose';

const LeaveSchema = new mongoose.Schema({
    startDate: { type: String },
    halfDayDate:{type:String},
    endDate: { type: String },
    type:{type:String,required:true},
    reason: { type: String, required: true },
    duration: { type: Number },
    username: { type: String, required: true },
    status: {type:String, default:'PENDING'}

}, { timestamps: true })

export const LeaveApplication = mongoose.model('LeaveApplication', LeaveSchema); 