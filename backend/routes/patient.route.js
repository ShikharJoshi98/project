import express from "express";
import { getPatientAppointment } from "../controllers/patient.controller.js";

const PatientRouter = express.Router();

PatientRouter.get('/getAppointments/:id',getPatientAppointment)

export default PatientRouter