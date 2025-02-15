import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
    medicine: {type: String}
})

const potencySchema = new mongoose.Schema({
    potency: {type: String}
})

const MedicalStockSchema = new mongoose.Schema({
    medicineName: { type: String, required: true },
    potency: { type: String, required: true },
    quantity: { type: Number, required: true }
})

const orderitemsschema = new mongoose.Schema({
    medicine: {type:String, required:true}
})

const ordermedicalSchema = new mongoose.Schema({
    medicine: [
        {
            itemName: { type: String, required: true },
            pack: { type: String, required: true },
            vendor: { type: String, required: true },            
            quantity: { type: Number, required: true },
            deliveryDate: { type: Date, required: true },
        }
    ],
    orderDate: { type: Date, default: Date.now }
})


export const Medicine = mongoose.model('Medicine', medicineSchema);
export const Potency = mongoose.model('Potency', potencySchema);
export const MedicalStock = mongoose.model('MedicalStock', MedicalStockSchema);
export const medicalItem = mongoose.model('medicalItem', orderitemsschema);
export const medicalOrder = mongoose.model('medicalOrder', ordermedicalSchema);