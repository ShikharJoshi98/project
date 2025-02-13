import mongoose from "mongoose";

const ItemVendorSchema = new mongoose.Schema({
    vendorname: {
        type: String,
        required:true
    },
    contact: {
    type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    address: {
        type: String,
        required:true
    }
    
})

const MedicalVendorSchema = new mongoose.Schema({
    vendorname: {
        type: String,
        required:true
    },
    contact: {
    type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    address: {
        type: String,
        required:true
    }
    
})




export const ItemVendor = mongoose.model('ItemVendor', ItemVendorSchema);
export const MedicalVendor = mongoose.model('MedicalVendor', MedicalVendorSchema);
