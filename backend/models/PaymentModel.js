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
    totalBill:{type:Number},
    modeOfPayment: { type: String },
    date: { type: String },
    appointmentType: { type: String },
    paymentCollectedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }
})

const balanceDueSchema = new mongoose.Schema({
    dueBalance: { type: Number, default: 0 },
    date: { type: String },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }
})

export const fees = mongoose.model('fees', feeSchema);
export const billPayment = mongoose.model('billPayment', billPaymentSchema);
export const balanceDue = mongoose.model('balanceDue', balanceDueSchema);