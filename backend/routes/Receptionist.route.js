import express from 'express';
import { getAllPatients, getAppointmentsRec, getPatient, getPatients, register, updatePatient } from '../controllers/Receptionist.controller.js';

const Recrouter = express.Router();

Recrouter.post("/register", register);
Recrouter.get('/get-patients/:branch', getPatients);//
Recrouter.get('/getPatient/:id', getPatient);
Recrouter.put('/update-patient/:id', updatePatient);
Recrouter.get('/getAppointments/:branch', getAppointmentsRec)//
Recrouter.get('/getAllPatients', getAllPatients);
export default Recrouter;
