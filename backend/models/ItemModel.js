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
    quantity: { type: Number, required: true }
})

const orderSchema = new mongoose.Schema({
    items: [
        {
            itemName: { type: String, required: true },
            unit: { type: String, required: true },
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

