import express from 'express';
import { addBriefMindSymptomScribble, addChiefComplaintScribble, addDiagnosis, addFamilyMedicalPatient, addFollowUpPatient, addHealthRecord, addInvestigationAdvised, addMentalCausativePatient, addMentalCausativeScribble, addMentalPersonalityPatient, addMentalPersonalityScribble, addMiasmPatient, addNewCaseMaster, addNewPrescription, addPastHistoryPatient, addPersonalHistoryScribble, addPresentComplaintPatient, addThermalReactionPatient, addWriteUpPatient, AppointmentDoc, assignTask, deleteCaseImages, deleteCaseMaster, deleteDiagnosisImages, deleteEmployee, deleteFamilyMedical, deleteFollowUpPatient, deleteHealthRecord, deleteHomeoBhagwatcol, deleteMentalCausative, deleteMentalPersonality, deleteMiasm, deletePastHistoryPatient, deletePresentComplaintPatient, DeleteTask, deleteThermalReaction, deleteTodayPrescription, deleteWriteUp, getAllAppointments, getAllPrescription, getCaseMaster, getDiagnosis, getDiagnosisImages, getFamilyMedicalPatient, getFollowUpImages, getFollowUpPatient, getHomeoBhagwat, getInvestigationAdvised, getMentalCausativePatient, getMentalPersonalityPatient, getMiasmPatient, getPastHistoryPatient, getPatientAppDetails, getPatientImages, getPrescriptionToday, getPresentComplaintPatient, getThermalReactionPatient, getWriteUpPatient, getWriteUpUpdate, HomeoBhagwat, leaveDetails, taskDetails, updateHomeoBhagwat, updateleave, updateTaskStatus, updateTodayPrescription, uploadCaseImage, uploadComplaintImage, uploadDiagnosisImage, uploadFollowUpImage } from '../controllers/doctor.controller.js';
import multer from 'multer';


const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed"), false);
    }
};
const upload = multer({ storage, fileFilter });


const Docrouter = express.Router();

Docrouter.post('/new-task', assignTask);
Docrouter.get('/task-details', taskDetails);
Docrouter.put('/update-task-status', updateTaskStatus);
Docrouter.delete('/delete-task/:id', DeleteTask);
Docrouter.get('/leave-details', leaveDetails);
Docrouter.put('/leave-status/:id', updateleave);
Docrouter.post('/appointment-doctor', AppointmentDoc);
Docrouter.post('/homeo-book', HomeoBhagwat);
Docrouter.get('/get-homeo-book', getHomeoBhagwat);
Docrouter.put('/update-homeo-book/:id', updateHomeoBhagwat);
Docrouter.post('/upload-case-image/:id', upload.single("caseImage"), uploadCaseImage);
Docrouter.post('/upload-diagnosis-image/:id',upload.single("diagnosisImage"),uploadDiagnosisImage );
Docrouter.get("/case-images/:id", getPatientImages);
Docrouter.get("/diagnosis-images/:id", getDiagnosisImages);
Docrouter.delete('/homeo-delete/:id', deleteHomeoBhagwatcol);
Docrouter.get('/get-patient-details/:appointmentType',getPatientAppDetails)
Docrouter.delete('/patient/:patientId/case-images/:imageId', deleteCaseImages);
Docrouter.delete('/patient/:patientId/diagnosis-images/:imageId', deleteDiagnosisImages);
Docrouter.post('/add-health-records/:id', addHealthRecord);
Docrouter.delete('/patient/:id/health-record/:recordId', deleteHealthRecord);
Docrouter.post('/upload-followup-image/:id', upload.single("followUpImage"), uploadFollowUpImage);
Docrouter.post('/upload-complaint-image/:id',upload.single("complaintImage"),uploadComplaintImage );
Docrouter.get("/followup-images/:id", getFollowUpImages);
Docrouter.get("/compaint-images/:id", getDiagnosisImages);
Docrouter.delete('/patient/:patientId/followup-images/:imageId', deleteFollowUpPatient);
Docrouter.post('/add-diagnosis/:id', addDiagnosis);
Docrouter.get("/get-diagnosis/:id", getDiagnosis);
Docrouter.post("/add-new-prescription/:id", addNewPrescription);
Docrouter.get("/get-today-prescription/:id", getPrescriptionToday);
Docrouter.get('/get-appointments', getAllAppointments);
//get all Presciption new api to be integrated for all prescription without date filter
Docrouter.get("/get-all-prescription/:id",getAllPrescription);
Docrouter.delete("/delete-today-prescription/:id",deleteTodayPrescription);
Docrouter.patch("/update-prescription/:id",updateTodayPrescription);
Docrouter.post("/add-follow-up-patient/:id",addFollowUpPatient);
Docrouter.get("/get-follow-up-patient/:id",getFollowUpPatient);
//At add data from writing pad
Docrouter.post("/add-write-up-patient/:id",addWriteUpPatient);
//get all write up patient endpoint to be integrate Frontend
Docrouter.get("/get-write-up-patient/:id",getWriteUpPatient);
//get data to edit write up patient
Docrouter.get('/get-write-up-update/:id',getWriteUpUpdate);
Docrouter.delete('/patient/:patientId/write-up-delete/:imageId',deleteWriteUp);
//investigation-advised routes
Docrouter.post('/addInvestigationAdvised',addInvestigationAdvised);
Docrouter.get('/getInvestigationAdvised', getInvestigationAdvised);
//delete-employee
Docrouter.delete('/delete-employee/:id', deleteEmployee);

//Add Data to new case master api
Docrouter.post('/addNewCaseMaster',addNewCaseMaster);//done
Docrouter.post('/add-present-complaints-patient/:id',addPresentComplaintPatient);//done
Docrouter.post('/add-past-history-patient/:id',addPastHistoryPatient);
Docrouter.post('/add-family-history-patient/:id',addFamilyMedicalPatient);
Docrouter.post('/add-mental-causative-patient/:id',addMentalCausativePatient);
Docrouter.post('/add-mental-personality-patient/:id',addMentalPersonalityPatient);
Docrouter.post('/add-thermal-reaction-patient/:id',addThermalReactionPatient);
Docrouter.post('/add-miasm-patient/:id',addMiasmPatient);
Docrouter.post('/add-mentalCausative-scribble/:id',addMentalCausativeScribble);
Docrouter.post('/add-mentalPersonality-scribble/:id',addMentalPersonalityScribble);
Docrouter.post('/add-chiefComplaint-scribble/:id',addChiefComplaintScribble);
Docrouter.post('/add-personalHistory-scribble/:id',addPersonalHistoryScribble);
Docrouter.post('/add-briefMindSymptom-scribble/:id',addBriefMindSymptomScribble);

//get newCase APIs

Docrouter.get('/CaseMaster/:id', getCaseMaster);
Docrouter.get('/presentComplaints/:id', getPresentComplaintPatient);
Docrouter.get('/pastHistory/:id', getPastHistoryPatient);
Docrouter.get('/familyMedical/:id',getFamilyMedicalPatient);
Docrouter.get('/mentalCausative/:id',getMentalCausativePatient);
Docrouter.get('/mentalPersonality/:id',getMentalPersonalityPatient);
Docrouter.get('/thermalReaction/:id',getThermalReactionPatient);
Docrouter.get('/miasmPatient/:id',getMiasmPatient);


//delete newCase APIs
Docrouter.delete('/deleteCaseMaster/:type/:id', deleteCaseMaster);
Docrouter.delete('/deletepresentComplaints/:id', deletePresentComplaintPatient);
Docrouter.delete('/deletepastHistory/:id', deletePastHistoryPatient);
Docrouter.delete('/deleteFamilyMedical/:id', deleteFamilyMedical);
Docrouter.delete('/deleteMentalCausative/:id/:idx', deleteMentalCausative);
Docrouter.delete('/deleteMentalPersonality/:id/:idx', deleteMentalPersonality);
Docrouter.delete('/deleteThermalReaction/:id/:idx', deleteThermalReaction);
Docrouter.delete('/deleteMiasm/:id/:idx', deleteMiasm);

export default Docrouter
