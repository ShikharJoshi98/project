import mongoose from "mongoose";

const investigationAdvisedSchema = new mongoose.Schema({
    inputData: { type: String }
});

const ultraSonogrophySchema = new mongoose.Schema({
    inputData: { type: String }
});

const dopplerStudiesSchema = new mongoose.Schema({
    inputData: { type: String }
});

const obsetricsSchema = new mongoose.Schema({
    inputData: { type: String }
});

const sonographySchema = new mongoose.Schema({
    inputData: { type: String }
});

const ctScanSchema = new mongoose.Schema({
    inputData: { type: String }
});

const mriScanSchema = new mongoose.Schema({
    inputData: { type: String }
});

const testSchema = new mongoose.Schema({
    investigationAdvised: [{ type: String }],
    ultra_sonography: [{ type: String }],
    dopplerStudies: [{ type: String }],
    obsetrics: [{ type: String }],
    sonography: [{ type: String }],
    ctScan: [{ type: String }],
    mriScan: [{type:String}],
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },        
    createdAt: {
        type: Date,
        default: Date.now
    }
});
testSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 }); // 24 hours


export const investigationAdvised = mongoose.model('investigationAdvised', investigationAdvisedSchema); 
export const ultraSonography = mongoose.model('ultraSonography', ultraSonogrophySchema); 
export const dopplerStudies = mongoose.model('dopplerStudies', dopplerStudiesSchema); 
export const obsetrics = mongoose.model('obsetrics', obsetricsSchema); 
export const sonography = mongoose.model('sonography', sonographySchema); 
export const ctScan = mongoose.model('ctScan', ctScanSchema); 
export const mriScan = mongoose.model('mriScan', mriScanSchema); 
export const testTable = mongoose.model('testTable', testSchema);