import mongoose from "mongoose";

const HomeoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    section: { type: String,required:true }
})

export const Homeo = mongoose.model('Homeo', HomeoSchema);