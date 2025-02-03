import mongoose from "mongoose";

const receptionistSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },   
    address: { type: String, required: true },
    password: { type: String, required: true },
    branch: { type: String, required: true },
    role: {
        type: String,
        required:true,
        default: "receptionist"
    },
})

const Receptionist = mongoose.model('Receptionist', receptionistSchema);
export default Receptionist