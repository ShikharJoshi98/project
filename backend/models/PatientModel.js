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
    
}, { timestamps: true });

const prescriptionSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    diagnosis: {
        type: [String]
    },
    medicine: {
        type: String
    },
    potency: {
        type: String
    },
    start_date: {
        type: String
    },
    dose: {
        type: String,
    },
    duration: {
        type: String
    },
    note: {
        type: String
    },
    prescription_date: {
        type: String
    }
});

const followUpPatientSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    follow_string: {
        type: String
    },
    date: {
        type:String
    }
});

const Patient = mongoose.model('Patient', PatientSchema);
export const Prescription = mongoose.model('Prescription', prescriptionSchema);
export const FollowUpPatient = mongoose.model('FollowUpPatient',followUpPatientSchema);
export default Patient