import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    itemName: {type: String}
})

const unitSchema = new mongoose.Schema({
    unit: {type: String}
})

const StockSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    unit: { type: String, required: true },
    quantity: { type: Number, required: true },
    branch: { type: String, required: true },
    docApproval_flag:{type:Boolean,default:false},
    receive_quantity: { type: Number, default: 0 },
    issue_quantity: { type: Number, default: 0 },
    reorder_level: { type: Number, default: 0 },
    approval_flag_new: { type: Boolean, default: false },
    approval_flag_issue: { type: Boolean, default: false },
    approval_flag_receive: { type: Boolean, default: false },
    is_order_able: { type: Boolean, default: false }
}, {
    timestamps: { createdAt: 'timestamp', updatedAt: 'last_updated' }
});

const orderPlacedSchema = new mongoose.Schema({
    
})

const orderSchema = new mongoose.Schema({
    formRows: [
        {
            itemName: { type: String, required: true },
            vendor: { type: String, required: true },            
            quantity: { type: Number, required: true },
            deliveryDate: { type: Date, required: true },
        }
    ],
    orderDate: { type: Date, default: Date.now }
})

export const Order = mongoose.model('Order', orderSchema);
export const ItemStock = mongoose.model('ItemStock', StockSchema);
export const Item = mongoose.model('Item', itemSchema);
export const Unit = mongoose.model('Unit', unitSchema);

