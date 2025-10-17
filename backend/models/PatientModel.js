import mongoose from "mongoose";


const PatientSchema = new mongoose.Schema({
    imageData: { type: String},
    username: { type: String, required: true },
    role:{type:String,default:'patient'},
    casePaperNo: { type: String },
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
    First_Appointment_Flag: { type: Boolean, default: true },
    Case_Assignment_Flag: { type: Boolean, default: false },
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
    patientCard: { type:String },
   
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
    },
    next_visit: {
        type: String
    },
    medicine_issued_flag: {
        type: Boolean,default:false
    },
    send_to_HR: {
        type:Boolean,default:false
    }
});

const otherPrescriptionPriceSchema = new mongoose.Schema({
    price:{type:Number}
})

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

const presentComplaintPatientSchema = new mongoose.Schema({
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

const diagnosisMasterSchema = new mongoose.Schema({
    diagnosis: [{ type: String }]
});

const presentComplaintWriteUpScehma = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    writeUp_value: {
        type: String
    },
    date: {
        type:String
    }
})

const writeUpPatientSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    writeUp_value: {
        type: String
    },
    date: {
        type:String
    }
})

const investigationSchema = new mongoose.Schema({
    investigationAdvised :{
        type: [String]
    },
    ultraSonography : {
        type: [String]
    },
    dopplerStudies : {
        type: [String]
    },
    obstetrics : {
        type: [String]
    },
    sonography: {
        type: [String]
    },
    ctScan: {
        type: [String]
    },
    mriScan: {
        type: [String]
    }
});

const otherPrescriptionSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    medicineName: { type: String, required: true },
    price: { type: Number, required: true },  
    medicine_issued_flag: { type: Boolean, default: false },
    date:{type:String}
})

const caseImagesSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    case_Image_string: {
        type: String
    },
    date: {
        type:String
    }
})

const reportImagesSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    report_Image_string: {
        type: String
    },
    date: {
        type:String
    }
})

const Patient = mongoose.model('Patient', PatientSchema);
export const Prescription = mongoose.model('Prescription', prescriptionSchema);
export const FollowUpPatient = mongoose.model('FollowUpPatient', followUpPatientSchema);
export const PresentComplaintScribble = mongoose.model('PresentComplaintScribble',presentComplaintPatientSchema);
export const PresentComplaintWriteUp = mongoose.model('PresentComplaintWriteUp',presentComplaintWriteUpScehma);
export const WriteUpPatient = mongoose.model('WriteUpPatient', writeUpPatientSchema);
export const Investigation = mongoose.model('Investigation', investigationSchema);
export const OtherPrescription = mongoose.model('OtherPrescription', otherPrescriptionSchema);
export const diagnosis = mongoose.model('diagnosis', diagnosisMasterSchema);
export const otherPrescriptionPrice = mongoose.model('otherPrescriptionPrice', otherPrescriptionPriceSchema);
export const CaseImage = mongoose.model('CaseImage', caseImagesSchema);
export const ReportImage = mongoose.model('ReportImage', reportImagesSchema);

export default Patient