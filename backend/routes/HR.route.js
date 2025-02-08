import express from 'express';
import { detail_doctors,  detail_receptionist,  register_doctor, register_receptionist, update } from '../controllers/HR.controller.js';

const HRrouter = express.Router();

HRrouter.get('/get-details-doctor', detail_doctors);
HRrouter.get('/get-details-receptionist', detail_receptionist);
HRrouter.post('/register-doctor', register_doctor);
HRrouter.post('/register-receptionist', register_receptionist);
HRrouter.put('/update/:id', update);

export default HRrouter;