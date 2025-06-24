import express from 'express';
import { add_item, add_item_stock, add_item_vendor, add_medical_stock, add_medical_vendor, add_medicine, add_potency, add_unit,  addBillImage,  deleteBillImages,  details,  edit_medical_vendor,  edit_vendor,  get_Item_Order,  get_item_stock,  get_medical_stock,  get_medical_vendor,  get_vendor,  getBillImage,  getCollection,  getItems,  getMedicine, getPotency,  getUnits,  LeaveApply,  medical_items_get,  medical_items_order,  place_item_order,  place_medical_order, register,   update, updateItemStock, updateMedicalStock, updateReceivedOrder} from '../controllers/HR.controller.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed"), false);
    }
};
const upload = multer({ storage, fileFilter });
const HRrouter = express.Router();

HRrouter.get('/get-details',details)
HRrouter.post('/register', register);
HRrouter.post('/apply-leave', LeaveApply);
HRrouter.put('/update/:id', update);

//item stock
HRrouter.post('/add-item', add_item);
HRrouter.post('/add-unit', add_unit);
HRrouter.post('/add-item-vendor', add_item_vendor);
HRrouter.post('/add-item-stock', add_item_stock);
HRrouter.get('/get-item-stock',get_item_stock);
HRrouter.post('/place-item-order', place_item_order);
HRrouter.get('/get-items', getItems);
HRrouter.get('/get-units', getUnits);
HRrouter.get('/get-vendors', get_vendor);
HRrouter.put('/edit-vendor', edit_vendor);
HRrouter.patch('/update-stock/:id', updateItemStock);
HRrouter.get('/getItemOrders/:id', get_Item_Order);
HRrouter.patch('/updateReceivedOrder/:orderId/:itemId', updateReceivedOrder);
HRrouter.post('/upload-Bill-image/:orderId', upload.single("Bill"), addBillImage);
HRrouter.get('/get-Bill-images/:orderId', getBillImage);
HRrouter.delete('/deleteBillImage/:orderId/:id', deleteBillImages);

//medical stock
HRrouter.post('/add-medicine', add_medicine);
HRrouter.post('/add-potency', add_potency);
HRrouter.get('/get-medicine', getMedicine);
HRrouter.get('/get-potency', getPotency);
HRrouter.post('/add-medical-vendor', add_medical_vendor);
HRrouter.get('/get-medical-vendors', get_medical_vendor);
HRrouter.put('/edit-medical-vendor', edit_medical_vendor);
HRrouter.post('/add-medicine-stock', add_medical_stock);
HRrouter.patch('/update-medical-stock/:id', updateMedicalStock);
HRrouter.get('/get-medical-stock/:branch', get_medical_stock);
HRrouter.post('/add-medicine-item', medical_items_order);
HRrouter.get('/get-medicine-item', medical_items_get);
HRrouter.post('/place-medical-order', place_medical_order);


//collections
HRrouter.get('/collections/:branch',getCollection);



export default HRrouter;