import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    phone: { type: String, required: true },
    Altphone: { type: String },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    branch: {type:String, required: true}
})

const patientModel = mongoose.models('patient', PatientSchema);
export default patientModel