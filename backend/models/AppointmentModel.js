import mongoose from 'mongoose'

const createAppointmentSchema = new mongoose.Schema({
    date: { type: String, required: true },
    time: { type: String },
    PatientCase: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    Doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    appointmentType: { type: String, required: true },
    new_appointment_flag: { type: Boolean, default: false },
    medicine_issued_flag:{type:Boolean,default:false}
})

export const Appointment = mongoose.model('Appointment', createAppointmentSchema);