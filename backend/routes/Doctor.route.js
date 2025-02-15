import express from 'express';
import { assignTask, taskDetails, updateTaskStatus } from '../controllers/doctor.controller.js';


const Docrouter = express.Router();

Docrouter.post('/new-task', assignTask);
Docrouter.get('/task-details/:username', taskDetails);
Docrouter.put('/update-task-status', updateTaskStatus);

export default Docrouter
