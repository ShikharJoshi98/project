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
    balanceDue: { type: Number },
    modeOfPayment: { type: String },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }
})

export const fees = mongoose.model('fees', feeSchema);
export const billPayment = mongoose.model('billPayment', billPaymentSchema);