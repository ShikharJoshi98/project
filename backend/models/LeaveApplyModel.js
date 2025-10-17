import mongoose from 'mongoose';

const LeaveSchema = new mongoose.Schema({
    startDate: { type: String },
    halfDayDate:{type:String},
    endDate: { type: String },
    type:{type:String,required:true},
    reason: { type: String, required: true },
    duration: { type: Number },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    status: {type:String, default:'PENDING'}

}, { timestamps: true })

export const LeaveApplication = mongoose.model('LeaveApplication', LeaveSchema); 