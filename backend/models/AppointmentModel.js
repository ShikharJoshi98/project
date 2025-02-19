import mongoose from 'mongoose'

const AppointmentSchema = new mongoose.Schema({
    AppointmentDate: { type: Date, required: true },
    Time: { type: String, required: true },
    PatientCase: { type: String, required: true },
    Doctor: { type: String, required: true },
    AppointmentType: {type:String,required:true}
})

export const AppointmentDoctor = mongoose.model('AppointmentDoctor', AppointmentSchema);