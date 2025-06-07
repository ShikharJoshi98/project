import mongoose from "mongoose";

const feeSchema = new mongoose.Schema({
    newCase: { type: Number },
    sevenDays: { type: Number },
    fifteenDays: { type: Number },
    twentyOneDays: { type: Number },
    thirtyDays: {type: Number},
    fortyFiveDays: { type: Number },
    twoMonths: { type: Number },
    threeMonths: { type: Number },
    Courier:{type:Number}
})

export const fees = mongoose.model('fees', feeSchema);