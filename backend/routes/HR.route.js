import express from 'express';
import { add_item, add_item_stock, add_item_vendor, add_unit, detail_doctors,  detail_receptionist,  place_item_order,  register_doctor, register_receptionist,  update_doctor, update_receptionist } from '../controllers/HR.controller.js';

const HRrouter = express.Router();

HRrouter.get('/get-details-doctor', detail_doctors);
HRrouter.get('/get-details-receptionist', detail_receptionist);
HRrouter.post('/register-doctor', register_doctor);
HRrouter.post('/register-receptionist', register_receptionist);
HRrouter.put('/update-doctor/:id', update_doctor);
HRrouter.put('/update-receptionist/:id', update_receptionist);
HRrouter.post('/add-item', add_item);
HRrouter.post('/add-unit', add_unit);
HRrouter.post('/add-item-vendor', add_item_vendor);
HRrouter.post('/add-item-stock', add_item_stock);
HRrouter.post('/place-item-order', place_item_order);



export default HRrouter;