import express from 'express';
import { AppointmentDoc, assignTask, DeleteTask, getHomeoBhagwat, HomeoBhagwat, leaveDetails, taskDetails, updateHomeoBhagwat, updateleave, updateTaskStatus } from '../controllers/doctor.controller.js';


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



export default Docrouter
