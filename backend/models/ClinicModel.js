import mongoose from "mongoose";

const ClinicSchema = new mongoose.Schema({
    branch: {type: String},
    phone: [{ type: String }],
    email: { type: String },
    shifts: [{ type: String }],
    selectedBranch: {type: Boolean}
});

const letterHeadSchema = new mongoose.Schema({
    billInvoiceImage: { type: String },
    letterHeadImage: { type: String },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }
});

export const Clinic = mongoose.model('Clinic', ClinicSchema);
export const letterHead = mongoose.model('letterHead', letterHeadSchema);