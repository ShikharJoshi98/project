import express from 'express';
import { getPatients, register, updatePatient } from '../controllers/Receptionist.controller.js';

const Recrouter = express.Router();

Recrouter.post("/register", register);
Recrouter.get('/get-patients', getPatients);
Recrouter.put('/update-patient/:id', updatePatient);//

export default Recrouter;
