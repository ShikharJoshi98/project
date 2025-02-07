import express from 'express';
import { details, register, update } from '../controllers/HR.controller.js';

const HRrouter = express.Router();

HRrouter.get('/get-details', details);
HRrouter.post('/register-doctor', register);
HRrouter.put('/update/:id', update);


export default HRrouter;