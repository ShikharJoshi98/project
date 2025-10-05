import mongoose from "mongoose";

const billInvoiceSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    selectedDiagnosis: { type: String, required: true },
    medicineName: { type: String },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    consultingFee: { type: String, required: true },
    medicineFee: { type: String, required: true },
    date: { type: String, required: true }
});

const certificateSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    diagnoseOne: { type: String },
    diagnoseTwo: { type: String },
    diagnoseThree: { type: String },
    date: { type: String },
    restFrom: { type: String },
    restTill: { type: String },
    resumeDate: { type: String },
    duration: { type: String }
});

export const BillInvoice = mongoose.model('BillInvoice', billInvoiceSchema);
export const Certificate = mongoose.model('Certificate', certificateSchema);