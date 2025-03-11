import mongoose from "mongoose";


const PatientSchema = new mongoose.Schema({
    imageData: { type: Buffer},
    username: { type: String, required:true },
    casePaperNo: { type: String },
    caseImages: [
        {
            imageUrl: { type: String, required: true }, 
            uploadedAt: { type: Date, default: Date.now },
        }
    ],
    diagnosisImages: [
        {
            imageUrl: { type: String, required: true }, 
            uploadedAt: { type: Date, default: Date.now },
        }
    ],
    followUpImages: [
        {
            imageUrl: { type: String, required: true }, 
            uploadedAt: { type: Date, default: Date.now },
        }
    ],  
    complaintImages: [
        {
            imageUrl: { type: String, required: true }, 
            uploadedAt: { type: Date, default: Date.now },
        }
    ],
    fullname: { type: String, required: true },
    age: { type: Number },
    gender: { type: String },
    address: { type: String},
    phone: { type: String, required: true },
    Altphone: { type: String },
    email: { type: String, required: true },
    qualification: { type: String },
    occupation: { type: String },
    dietaryPreference: { type: String },
    patientDiagnosis: [
        {
            type: String, 
        },
    ],
    healthRecords: [
        {
            weight: { type: String },
            bloodPressure: { type: String },
            date:{type:String},
        }
    ],
    maritalStatus: { type: String },
    referredBy: { type: String},
    password: { type: String, required:true },
    branch: { type: String, required: true },
    
   
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    
} ,{ timestamps: true });

const Patient = mongoose.model('Patient', PatientSchema);
export default Patient