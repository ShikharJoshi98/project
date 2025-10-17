import mongoose from "mongoose";

const ClinicSchema = new mongoose.Schema({
    branch: {type: String},
    phone: [{ type: String }],
    email: { type: String }
});

export const Clinic = mongoose.model('Clinic', ClinicSchema);