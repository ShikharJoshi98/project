import mongoose from "mongoose";

const shiftSchema = new mongoose.Schema({
    role: { type: String },
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    shift: {type:String}    
}) 

export const Shift = mongoose.model('Shift', shiftSchema);