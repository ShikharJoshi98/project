import mongoose from 'mongoose'

const createAppointmentSchema = new mongoose.Schema({
    date: { type: String, required: true },
    time: { type: String },
    PatientCase: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    Doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    appointmentType: { type: String, required: true },
    new_appointment_flag: { type: Boolean, default: true },
    complete_appointment_flag: { type: Boolean, default: false },
    medicine_issued_flag: { type: Boolean, default: false },
    followUp_appointment_flag: { type: Boolean, default: false },
    branch: { type: String, required: true }    
})

const consultationChargesSchema = new mongoose.Schema({
    type: { type: String, required: true },
    price: { type: String, required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },    
    date:{type: String},
})

const consultationChargesPriceSchema = new mongoose.Schema({
    price: { type: Number },
})

consultationChargesSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

export const Appointment = mongoose.model('Appointment', createAppointmentSchema);
export const ConsultationCharges = mongoose.model('ConsultationCharges', consultationChargesSchema);
export const consultationChargesPrice = mongoose.model('consultationChargesPrice', consultationChargesPriceSchema);