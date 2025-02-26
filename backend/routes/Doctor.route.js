import express from 'express';
import { addHealthRecord, AppointmentDoc, assignTask, deleteCaseImages, deleteDiagnosisImages, deleteHealthRecord, deleteHomeoBhagwatcol, DeleteTask, getDiagnosisImages, getHomeoBhagwat, getPatientAppDetails, getPatientImages, HomeoBhagwat, leaveDetails, taskDetails, updateHomeoBhagwat, updateleave, updateTaskStatus, uploadCaseImage, uploadDiagnosisImage } from '../controllers/doctor.controller.js';
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


export default Docrouter
