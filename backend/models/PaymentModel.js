import mongoose from "mongoose";

const feeSchema = new mongoose.Schema({
    newCase: { type: Number },
    sevenDays: { type: Number },
    fifteenDays: { type: Number },
    twentyOneDays: { type: Number },
    thirtyDays: { type: Number },
    fortyFiveDays: { type: Number },
    twoMonths: { type: Number },
    threeMonths: { type: Number },
    Courier: { type: Number }
})

const billPaymentSchema = new mongoose.Schema({
    billPaid: { type: Number },
    totalBill: { type: Number },
    dueBalance: { type: Number, default: 0 },
    modeOfPayment: { type: String },
    date: { type: String },
    appointmentType: { type: String },
    balance_paid_flag: { type: Boolean, default: false },
    transactionDetails:{type:String},
    paymentCollectedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }
})

export const fees = mongoose.model('fees', feeSchema);
export const billPayment = mongoose.model('billPayment', billPaymentSchema);
