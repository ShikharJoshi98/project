import express from 'express';
import { getAppointment, getPatient, getPatients, register, updatePatient } from '../controllers/Receptionist.controller.js';

const Recrouter = express.Router();

Recrouter.post("/register", register);
Recrouter.get('/get-patients/:role/:branch', getPatients);
Recrouter.get('/getPatient/:id', getPatient);
Recrouter.put('/update-patient/:id', updatePatient);
Recrouter.get('/getAppointments/:branch',getAppointment);
export default Recrouter;
