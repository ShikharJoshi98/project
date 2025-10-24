import mongoose from "mongoose";

const ClinicSchema = new mongoose.Schema({
    branch: {type: String},
    phone: [{ type: String }],
    email: { type: String },
    shifts: [{ type: String }],
    selectedBranch: {type: Boolean}
});

export const Clinic = mongoose.model('Clinic', ClinicSchema);