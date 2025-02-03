import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    address: { type: String, required: true },
    department: { type: String, required: true },
    Salary: { type: Number, required: true },
    attendance: { type: Number, required: true },
    status: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        required:true,
        default: "doctor"
    },
})

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor