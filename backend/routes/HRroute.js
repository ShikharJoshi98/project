import express from 'express';
import { loginHR } from '../controllers/HRcontroller.js';

const HRrouter = express.Router();

HRrouter.post('/login', loginHR);

export default HRrouter