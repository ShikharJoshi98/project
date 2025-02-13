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

export const Medicine = mongoose.model('Medicine', medicineSchema);
export const Potency = mongoose.model('Potency', potencySchema);
export const MedicalStock = mongoose.model('MedicalStock', MedicalStockSchema);
