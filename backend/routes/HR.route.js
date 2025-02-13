import express from 'express';
import { add_item, add_item_stock, add_item_vendor, add_medical_stock, add_medical_vendor, add_medicine, add_potency, add_unit, detail_doctors,  detail_receptionist,  edit_medical_vendor,  edit_vendor,  get_medical_vendor,  get_vendor,  getItems,  getMedicine,  getPotency,  getUnits,  place_item_order,  register_doctor, register_receptionist,  update_doctor, update_receptionist } from '../controllers/HR.controller.js';

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
HRrouter.get('/get-items', getItems);
HRrouter.get('/get-units', getUnits);
HRrouter.get('/get-vendors', get_vendor);
HRrouter.put('/edit-vendor', edit_vendor);
HRrouter.post('/add-medicine', add_medicine);
HRrouter.post('/add-potency', add_potency);
HRrouter.get('/get-medicine', getMedicine);
HRrouter.get('/get-potency', getPotency);
HRrouter.post('/add-medical-vendor', add_medical_vendor);
HRrouter.get('/get-medical-vendors', get_medical_vendor);
HRrouter.put('/edit-medical-vendor', edit_medical_vendor);
HRrouter.post('/add-medicine-stock', add_medical_stock);




export default HRrouter;