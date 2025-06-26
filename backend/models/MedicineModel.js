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
    quantity: { type: Number, required: true },
    branch: { type: String, required: true },
    docApproval_flag: { type: Boolean, default: false },
    receive_quantity: { type: Number, default: 0 },
    issue_quantity: { type: Number, default: 0 },
    reorder_level: { type: Number, default: 0 },
    approval_flag_new: { type: Boolean, default: true },
    approval_flag_issue: { type: Boolean, default: false },
    approval_flag_receive: { type: Boolean, default: false },
    is_order_placed: { type: Boolean, default: false },
    typeOfStock: { type: String, default: 'Medicine' }
}, {
    timestamps: { createdAt: 'timestamp', updatedAt: 'last_updated' }
})

const orderitemsschema = new mongoose.Schema({
    medicine: {type:String, required:true}
})

const orderSchema = new mongoose.Schema({
    formRows: [
        {
            medicineName: { type: String, required: true },
            vendor: [{ type: String, required: true }],
            pack: { type: String, required: true },
            quantity: { type: Number, required: true },
            deliveryDate: { type: String, required: true },
            medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalStock' },
            order_Delivered_Flag: { type: Boolean, default: false },
            doctor_Approval_Flag: { type: Boolean, default: false },
            receivedQuantity: { type: Number, default: 0 },
            received_date: { type: String }
        }
    ],
    orderDate: { type: String },
    Bill: [
        {
            imageUrl: { type: String }
        }
    ],
})


export const Medicine = mongoose.model('Medicine', medicineSchema);
export const Potency = mongoose.model('Potency', potencySchema);
export const MedicalStock = mongoose.model('MedicalStock', MedicalStockSchema);
export const medicalItem = mongoose.model('medicalItem', orderitemsschema);
export const medicalOrder = mongoose.model('medicalOrder', orderSchema);