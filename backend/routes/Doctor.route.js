import express from 'express';
import { addDiagnosis, addFollowUpPatient, addHealthRecord, addNewPrescription, AppointmentDoc, assignTask, deleteCaseImages, deleteDiagnosisImages, deleteFollowUpImages, deleteHealthRecord, deleteHomeoBhagwatcol, DeleteTask, deleteTodayPrescription, getAllPrescription, getDiagnosis, getDiagnosisImages, getFollowUpImages, getFollowUpPatient, getHomeoBhagwat, getPatientAppDetails, getPatientImages, getPrescriptionToday, HomeoBhagwat, leaveDetails, taskDetails, updateHomeoBhagwat, updateleave, updateTaskStatus, uploadCaseImage, uploadComplaintImage, uploadDiagnosisImage, uploadFollowUpImage } from '../controllers/doctor.controller.js';
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
Docrouter.delete('/patient/:patientId/followup-images/:imageId', deleteFollowUpImages);
Docrouter.post('/add-diagnosis/:id', addDiagnosis);
Docrouter.get("/get-diagnosis/:id", getDiagnosis);
Docrouter.post("/add-new-prescription/:id", addNewPrescription);
Docrouter.get("/get-today-prescription/:id", getPrescriptionToday);
//get all Presciption new api to be integrated for all prescription without date filter
Docrouter.get("/get-all-prescription/:id",getAllPrescription);
Docrouter.delete("/delete-today-prescription/:id",deleteTodayPrescription);
Docrouter.post("/add-follow-up-patient/:id",addFollowUpPatient);
Docrouter.get("/get-follow-up-patient/:id",getFollowUpPatient);

export default Docrouter
