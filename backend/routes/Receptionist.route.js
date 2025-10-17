import express from 'express';
import { getAllPatients, getAppDetails, getAppointmentLength, getAppointmentsRec, getDoctor, getPatient, getPatients, getShift, register, setShift, updatePatient } from '../controllers/Receptionist.controller.js';

const Recrouter = express.Router();

Recrouter.post("/register", register);
Recrouter.get('/get-patients/:branch', getPatients);//
Recrouter.get('/getPatient/:id', getPatient);
Recrouter.put('/update-patient/:id', updatePatient);
Recrouter.get('/getAppointments/:branch/:shift', getAppointmentsRec)//
Recrouter.get('/getRecAppointments/:branch/:appointmentType/:shift',getAppDetails)
Recrouter.get('/getAllPatients/:branch', getAllPatients);//
Recrouter.get('/getAppointmentsLength/:branch/:shift', getAppointmentLength)
Recrouter.get('/getDoctor/:id', getDoctor);
Recrouter.post('/setShift', setShift)
Recrouter.get('/getShift/:user/:role',getShift)

export default Recrouter;
