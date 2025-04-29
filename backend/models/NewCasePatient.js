import mongoose from "mongoose";

const PresentComplaintsMasterSchema = new mongoose.Schema({
    name: { type: String}
});

const PastHistoryMasterSchema = new mongoose.Schema({
    name: { type: String}
});

const FamilyMedicalMasterSchema = new mongoose.Schema({
    name: { type: String}
});

const MentalCausativeMasterSchema = new mongoose.Schema({
    name: { type: String}
});

const MentalPersonalityMasterSchema = new mongoose.Schema({
    name: { type: String}
});

const BriefMindSymptomsMasterSchema = new mongoose.Schema({
    name: { type: String}
});

const ThermalReactionMasterSchema = new mongoose.Schema({
    name: { type: String}
});

const MiasmMasterSchema = new mongoose.Schema({
    name: { type: String}
});

const PresentComplaintsPatientSchema = new mongoose.Schema({
    patient: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient'},
    complaintName: {type:String, required:true},
    duration: {type:String,required:true},
    durationSuffix: {type:String, required:true},
    created_at: {type:String, required:true}
});

const PastHistoryPatientSchema = new mongoose.Schema({
    patient: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient'},
    complaintName: {type:String, required:true},
    lastDiagnosed: {type:String,required:true},
    lastSuffix: {type:String, required:true},
    duration: {type:String,required:true},
    durationSuffix: {type:String, required:true},
    remark: {type:String,required:true},
    created_at: {type:String, required:true}
});

const FamilyHistoryPatientSchema = new mongoose.Schema({
    patient: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient'},
    relation: {type:String, required:true},
    diseases: [{type:String, required:true}],
    anyOther: {type:String,required:true},
    lifeStatus: {type:String, required:true},    
    age: {type:String,required:true},
    created_at: {type:String, required:true}
});

const MentalCausativePatientSchema = new mongoose.Schema({
    patient: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient'},    
    diseases: [{type:String, required:true}],
    created_at: {type:String, required:true}
});

const MentalPersonalityPatientSchema = new mongoose.Schema({
    patient: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient'},    
    diseases: [{type:String, required:true}],
    created_at: {type:String, required:true}
});

const ThermalReactionPatientSchema = new mongoose.Schema({
    patient: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient'},    
    diseases: [{type:String, required:true}],
    created_at: {type:String, required:true}
});

const MiasmPatientSchema = new mongoose.Schema({
    patient: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient'},    
    diseases: [{type:String, required:true}],
    created_at: {type:String, required:true}
});

export const PresentComplaintsMaster = mongoose.model('PresentComplaintsMaster', PresentComplaintsMasterSchema );
export const PastHistoryMaster = mongoose.model('PastHistoryMaster', PastHistoryMasterSchema );
export const FamilyMedicalMaster = mongoose.model('FamilyMedicalMaster', FamilyMedicalMasterSchema );
export const MentalCausativeMaster = mongoose.model('MentalCausativeMaster', MentalCausativeMasterSchema );
export const MentalPersonalityMaster = mongoose.model('MentalPersonalityMaster', MentalPersonalityMasterSchema );
export const BriefMindSymptomsMaster = mongoose.model('BriefMindSymptomsMaster', BriefMindSymptomsMasterSchema );
export const ThermalReactionMaster = mongoose.model('ThermalReactionMaster', ThermalReactionMasterSchema );
export const MiasmMaster = mongoose.model('MiasmMaster', MiasmMasterSchema );
export const PresentComplaintsPatient = mongoose.model('PresentComplaintsPatient',PresentComplaintsPatientSchema);
export const PastHistoryPatient = mongoose.model('PastHistoryPatient',PastHistoryPatientSchema);
export const FamilyHistoryPatient = mongoose.model('FamilyHistoryPatient',FamilyHistoryPatientSchema);
export const MentalCausativePatient = mongoose.model('MentalCausativePatient',MentalCausativePatientSchema);
export const MentalPersonalityPatient = mongoose.model('MentalPersonalityPatient',MentalPersonalityPatientSchema);
export const ThermalReactionPatient = mongoose.model('ThermalReactionPatient',ThermalReactionPatientSchema);
export const MiasmPatient = mongoose.model('MiasmPatient',MiasmPatientSchema);