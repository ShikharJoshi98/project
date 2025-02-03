import mongoose from "mongoose";

const hrSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },    
    password: { type: String, required: true },
    role: {
        type: String,
        required:true,
        default: "hr"
    },
})

const HR = mongoose.model('HR', hrSchema);
export default HR