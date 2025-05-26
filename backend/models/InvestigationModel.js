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

export const investigationAdvised = mongoose.model('investigationAdvised', investigationAdvisedSchema); 
export const ultraSonography = mongoose.model('ultraSonography', ultraSonogrophySchema); 
export const dopplerStudies = mongoose.model('dopplerStudies', dopplerStudiesSchema); 
export const obsetrics = mongoose.model('obsetrics', obsetricsSchema); 
export const sonography = mongoose.model('sonography', sonographySchema); 
export const ctScan = mongoose.model('ctScan', ctScanSchema); 
export const mriScan = mongoose.model('mriScan', mriScanSchema); 