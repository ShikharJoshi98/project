import mongoose from 'mongoose'

// const AppointmentSchema = new mongoose.Schema({
//     AppointmentDate: { type: Date, required: true },
//     Time: { type: String },
//     PatientCase: { type: String, required: true },
//     Doctor: { type: String, required: true },
//     AppointmentType: { type: String, required: true },
//     Branch:{type:String, required:true}
// })
const AppointmentSchema = new mongoose.Schema({
    AppointmentDate: { type: String, required: true },
    Time: { type: String },
    PatientCase: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    Doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    AppointmentType: { type: String, required: true },   
    Appointment_Booked_Flag: { type: Boolean, default: false },
    Followup_Appointment_Flag: { type: Boolean, default: false },
    Medicine_Issued_Flag: { type: Boolean, default: false }
})

export const AppointmentDoctor = mongoose.model('AppointmentDoctor', AppointmentSchema);