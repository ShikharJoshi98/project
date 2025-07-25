import express from 'express';
import { addBillInvoice, addBriefMindSymptomScribble, addCertificateDetails, addChiefComplaintScribble, addConsultationCharges, addConsultationPrice, addDiagnosis, addFamilyMedicalPatient, addFollowUpPatient, addHealthRecord, addInvestigationAdvised, addInvestigationInfo, addMentalCausativePatient, addMentalCausativeScribble, addMentalPersonalityPatient, addMentalPersonalityScribble, addMiasmPatient, addNewCaseMaster, addNewPrescription, addOtherPrescription, addOtherPrescriptionPrice, addPastHistoryPatient, addPayment, addPaymentModel, addPersonalHistoryScribble, addPresentComplaintPatient, addPresentComplaintScribble, addThermalReactionPatient, addWriteUpPatient, addWriteUpPresentComplaint, approveMedicalStock, approveStock, assignTask, createNewAppointment, deleteCaseImages, deleteCaseMaster, deleteConsultationCharges, deleteDiagnosisImages, deleteEmployee, deleteFamilyMedical, deleteFollowUpPatient, deleteHealthRecord, deleteHomeoBhagwatcol, deleteInvestigationAdvised, deleteInvestigationInfo, deleteMentalCausative, deleteMentalPersonality, deleteMiasm, deleteOtherPrescription, deletePastHistoryPatient, deletePresentComplaintPatient, deletePresentComplaintScribble, deletePresentComplaintWriteUp, DeleteTask, deleteThermalReaction, deleteTodayPrescription, deleteWriteUp, editCertificate, getAllPrescription, getAppointments, getBalanceDue, getBill, getBillInvoice, getBriefMindSymptomScribble, getCaseMaster, getCertificates, getChiefComplaintScribble, getConsultationCharges, getConsultationPrice, getDiagnosis, getDiagnosisImages, getFamilyMedicalPatient, getFollowUpImages, getHistoryDetails, getHomeoBhagwat, getIncompleteAppointments, getInvestigationAdvised, getInvestigationInfo, getMentalCausativePatient, getMentalCausativeScribble, getMentalPersonalityPatient, getMentalPersonalityScribble, getMiasmPatient, getOtherPrescription, getOtherPrescriptionPrice, getPastHistoryPatient, getPatientImages, getPaymentBill, getPayments, getPersonalHistoryScribble, getPrescriptions, getPrescriptionToday, getPresentComplaintHistory, getPresentComplaintPatient, getPresentComplaintScribble, getThermalReactionPatient, getWriteUpPresentComplaint, getWriteUpUpdate, HomeoBhagwat, leaveDetails, taskDetails, updateAppointment, updateHomeoBhagwat, updateleave, updateOtherPrescription, updatePayment, updatePresInfo, updateTaskStatus, updateTodayPrescription, uploadCaseImage, uploadComplaintImage, uploadDiagnosisImage, uploadFollowUpImage } from '../controllers/doctor.controller.js';
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
Docrouter.get('/leave-details/:id', leaveDetails);
Docrouter.put('/leave-status/:id', updateleave);

//appointment
// Docrouter.post('/appointment', createAppointment);
Docrouter.post('/new-appointment', createNewAppointment);
Docrouter.get('/get-incomplete-appointments', getIncompleteAppointments);
Docrouter.get('/getAppointments/:branch/:appointmentSection/:doctor',getAppointments)//
Docrouter.patch('/update-apppointment/:id', updateAppointment);

//homeo-bhagwat
Docrouter.post('/homeo-book', HomeoBhagwat);
Docrouter.get('/get-homeo-book', getHomeoBhagwat);
Docrouter.put('/update-homeo-book/:id', updateHomeoBhagwat);
Docrouter.post('/upload-case-image/:id', upload.single("caseImage"), uploadCaseImage);
Docrouter.post('/upload-diagnosis-image/:id', upload.single("diagnosisImage"), uploadDiagnosisImage);
Docrouter.get("/case-images/:id", getPatientImages);
Docrouter.get("/diagnosis-images/:id", getDiagnosisImages);
Docrouter.delete('/homeo-delete/:id', deleteHomeoBhagwatcol);

//patient-appointment-details
Docrouter.delete('/patient/:patientId/case-images/:imageId', deleteCaseImages);
Docrouter.delete('/patient/:patientId/diagnosis-images/:imageId', deleteDiagnosisImages);
Docrouter.post('/add-health-records/:id', addHealthRecord);
Docrouter.delete('/patient/:id/health-record/:recordId', deleteHealthRecord);
// Docrouter.post('/upload-followup-image/:id', upload.single("followUpImage"), uploadFollowUpImage);
// Docrouter.post('/upload-complaint-image/:id', upload.single("complaintImage"), uploadComplaintImage);
Docrouter.get("/followup-images/:id", getFollowUpImages);
Docrouter.get("/compaint-images/:id", getDiagnosisImages);
Docrouter.delete('/patient/:patientId/followup-images/:imageId', deleteFollowUpPatient);
Docrouter.post('/add-diagnosis/:id', addDiagnosis);
Docrouter.get("/get-diagnosis/:id", getDiagnosis);
Docrouter.post("/add-new-prescription/:id", addNewPrescription);
Docrouter.get("/get-today-prescription/:id", getPrescriptionToday);
Docrouter.patch("/update-prescription", updatePresInfo);
Docrouter.post("/add-other-medicine/:id", addOtherPrescription);
Docrouter.get("/get-other-prescription/:id", getOtherPrescription);
Docrouter.delete("/delete-other-prescription/:id", deleteOtherPrescription)
Docrouter.patch("/updateOtherPrescription/:id",updateOtherPrescription)
Docrouter.get('/getAllPrescripion', getPrescriptions)
Docrouter.post('/otherPrescriptionPrice', addOtherPrescriptionPrice);
Docrouter.get('/getOtherPrescriptionPrice', getOtherPrescriptionPrice);

//price-routes
Docrouter.post('/add-consultation-charges/:id', addConsultationCharges);
Docrouter.get('/get-consultation-charges/:id', getConsultationCharges)
Docrouter.delete('/delete-consultation-charges/:id', deleteConsultationCharges);
Docrouter.post('/consultationChargePrice', addConsultationPrice);
Docrouter.get('/getconsultationChargePrice', getConsultationPrice);

//get all Presciption new api to be integrated for all prescription without date filter
Docrouter.get("/get-all-prescription/:id", getAllPrescription);
Docrouter.delete("/delete-today-prescription/:id", deleteTodayPrescription);
Docrouter.patch("/update-prescription/:id", updateTodayPrescription);
Docrouter.post("/add-follow-up-patient/:id", upload.single("savedImage"), addFollowUpPatient);

//At add data from writing pad
Docrouter.post("/add-write-up-patient/:id", addWriteUpPatient);
Docrouter.get("/getHistoryDetails/:id", getHistoryDetails);
Docrouter.get('/getPresentComplaint/:id', getPresentComplaintHistory);
//get data to edit write up patient
Docrouter.get('/get-write-up-update/:id', getWriteUpUpdate);
Docrouter.delete('/patient/:patientId/write-up-delete/:imageId', deleteWriteUp);

//investigation-advised routes
Docrouter.post('/addInvestigationAdvised', addInvestigationAdvised);
Docrouter.get('/getInvestigationAdvised/:type', getInvestigationAdvised);
Docrouter.delete('/deleteInvestigationAdvised/:id/:type', deleteInvestigationAdvised);
Docrouter.post('/add-test/:id', addInvestigationInfo);
Docrouter.get('/get-test/:id/:investigationType', getInvestigationInfo);
Docrouter.delete('/delete-test/:investigationType/:id/:test', deleteInvestigationInfo);
//delete-employee
Docrouter.delete('/delete-employee/:id', deleteEmployee);

//present-complaint
Docrouter.post('/add-presentComplaintScribble/:id', addPresentComplaintScribble);
Docrouter.post('/add-presentComplaintWriteUp/:id', addWriteUpPresentComplaint);
Docrouter.get('/get-present-compaint-scribble/:id', getPresentComplaintScribble);
Docrouter.get('/get-present-compaint-writeup/:id', getWriteUpPresentComplaint);
Docrouter.delete('/patient/:patientId/presentComplaint-images/:imageId', deletePresentComplaintScribble);
Docrouter.delete('/patient/:patientId/presentComplaint-write-up-delete/:imageId', deletePresentComplaintWriteUp);

//Add Data to new case master api
Docrouter.post('/addNewCaseMaster', addNewCaseMaster);//done
Docrouter.post('/add-present-complaints-patient/:id', addPresentComplaintPatient);//done
Docrouter.post('/add-past-history-patient/:id', addPastHistoryPatient);
Docrouter.post('/add-family-history-patient/:id', addFamilyMedicalPatient);
Docrouter.post('/add-mental-causative-patient/:id', addMentalCausativePatient);
Docrouter.post('/add-mental-personality-patient/:id', addMentalPersonalityPatient);
Docrouter.post('/add-thermal-reaction-patient/:id', addThermalReactionPatient);
Docrouter.post('/add-miasm-patient/:id', addMiasmPatient);
Docrouter.post('/add-mentalCausative-scribble/:id', addMentalCausativeScribble);
Docrouter.post('/add-mentalPersonality-scribble/:id', addMentalPersonalityScribble);
Docrouter.post('/add-chiefComplaint-scribble/:id', addChiefComplaintScribble);
Docrouter.post('/add-personalHistory-scribble/:id', addPersonalHistoryScribble);
Docrouter.post('/add-briefMindSymptom-scribble/:id', addBriefMindSymptomScribble);

//get newCase APIs
Docrouter.get('/CaseMaster/:id', getCaseMaster);
Docrouter.get('/presentComplaints/:id', getPresentComplaintPatient);
Docrouter.get('/chiefComplaints/:id', getChiefComplaintScribble);
Docrouter.get('/pastHistory/:id', getPastHistoryPatient);
Docrouter.get('/personalHistroy/:id', getPersonalHistoryScribble);
Docrouter.get('/familyMedical/:id', getFamilyMedicalPatient);
Docrouter.get('/mentalCausative/:id', getMentalCausativePatient);
Docrouter.get('/mentalCausativeScribble/:id', getMentalCausativeScribble);
Docrouter.get('/mentalPersonality/:id', getMentalPersonalityPatient);
Docrouter.get('/mentalPersonalityScribble/:id', getMentalPersonalityScribble);
Docrouter.get('/briefMindSymptomScribble/:id', getBriefMindSymptomScribble);
Docrouter.get('/thermalReaction/:id', getThermalReactionPatient);
Docrouter.get('/miasmPatient/:id', getMiasmPatient);

//delete newCase APIs
Docrouter.delete('/deleteCaseMaster/:type/:id', deleteCaseMaster);
Docrouter.delete('/deletepresentComplaints/:id', deletePresentComplaintPatient);
Docrouter.delete('/deletepastHistory/:id', deletePastHistoryPatient);
Docrouter.delete('/deleteFamilyMedical/:id', deleteFamilyMedical);
Docrouter.delete('/deleteMentalCausative/:id/:idx', deleteMentalCausative);
Docrouter.delete('/deleteMentalPersonality/:id/:idx', deleteMentalPersonality);
Docrouter.delete('/deleteThermalReaction/:id/:idx', deleteThermalReaction);
Docrouter.delete('/deleteMiasm/:id/:idx', deleteMiasm);

//payment
Docrouter.post('/addPayment', addPaymentModel);
Docrouter.get('/getPayment', getPayments);
Docrouter.patch('/updatePayment/:id', updatePayment);
Docrouter.get('/getBillPayment/:id', getBill);
Docrouter.post('/addBillPayment/:id', addPayment);
Docrouter.get('/getTotalBillPayment/:id', getPaymentBill);
Docrouter.get('/getBalanceDue/:id', getBalanceDue);

//item-stock
Docrouter.patch('/approveStock/:id', approveStock);

//medical-stock
Docrouter.patch('/approveMedicalStock/:id', approveMedicalStock)

//bill-invoice
Docrouter.post('/addBillInvoice', addBillInvoice);
Docrouter.get('/getBillInvoices', getBillInvoice);

//certificate
Docrouter.post('/postCertificate', addCertificateDetails);
Docrouter.get('/getCertificates', getCertificates);
Docrouter.patch('/updateCertificate/:id', editCertificate);

export default Docrouter