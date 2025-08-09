import express from "express";
import { getPatientAppointment, updatePatientAppointment } from "../controllers/patient.controller.js";

const PatientRouter = express.Router();

PatientRouter.get('/getAppointments/:id', getPatientAppointment);
PatientRouter.patch('/updatePatientAppointment/:id', updatePatientAppointment);

export default PatientRouter