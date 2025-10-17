import bcryptjs from "bcryptjs";
import Patient from "../models/PatientModel.js";
import { Appointment } from "../models/AppointmentModel.js";
import { updateDate } from "../utils/todayDate.js";
import { Employee } from "../models/EmployeeModel.js";
import { Shift } from "../models/ShiftModel.js";

export const register = async (req, res) => {
    try {
        const { fullname, phone, Altphone, email, branch } = req.body;
        const isBranch = branch === 'Mulund' ? 'MUL' : 'DOM';
        function usernameCreator(newName, newPhone) {
            let text = "";
            let firstName = newName.split(" ")[0] || "";
            let num = String(newPhone);
            text = firstName + num.slice(num.length - 4);
            return text;
        }
        const password = isBranch + "-" + usernameCreator(fullname, phone);
        const username = usernameCreator(fullname, phone);
        const existPatient = await Patient.findOne({ username });
        if (existPatient) {
            return res.status(400).json({ success: false, message: "Already exists." })
        }
        const hashedPassword = await bcryptjs.hash(password, 11);
        const newPatient = new Patient({
            username, casePaperNo: `${isBranch}-NEW`, fullname, phone, Altphone, email, password: hashedPassword, branch
        })
        await newPatient.save();
        res.status(200).json({
            newPatient: {
                ...newPatient._doc,
                password: undefined
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export const updatePatient = async (req, res) => {
    try {
        const { imageData, username, casePaperNo, fullname, age, gender, address, phone, Altphone, email, qualification, occupation, dietaryPreference, weight, bloodPressure, maritalStatus, referredBy, branch } = req.body;
        let updatedpatient;

        if (casePaperNo.length > 0 && (casePaperNo !== 'DOM-NEW' && casePaperNo !== 'MUL-NEW')) {
            updatedpatient = await Patient.findByIdAndUpdate(
                req.params.id,
                { imageData, username, casePaperNo, Case_Assignment_Flag: true, fullname, age, gender, address, phone, Altphone, email, qualification, occupation, dietaryPreference, weight, bloodPressure, maritalStatus, referredBy, branch },
                { new: true, runValidators: true }
            );
        }
        else {
            updatedpatient = await Patient.findByIdAndUpdate(
                req.params.id,
                { imageData, username, casePaperNo, Case_Assignment_Flag: false, fullname, age, gender, address, phone, Altphone, email, qualification, occupation, dietaryPreference, weight, bloodPressure, maritalStatus, referredBy, branch },
                { new: true, runValidators: true }
            );
        }

        if (!updatedpatient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json(updatedpatient);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getPatients = async (req, res) => {//
    try {
        const { branch } = req.params;
        const { page = 1 } = req.query;
        const { search = "" } = req.query;
        const pageNum = Number(page) || 1;
        const limitNum = 10;
        const skipPage = (pageNum - 1) * limitNum;

        const baseQuery = {
            branch: branch
        };
        if (search) {
            baseQuery.$or = [
                { fullname: { $regex: search, $options: "i" } },
                { casePaperNo: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } }
            ];
        }

        const patientLength = await Patient.countDocuments(baseQuery);
        const patients = await Patient.find(baseQuery).skip(skipPage).limit(limitNum);
        res.json({
            success: true, patients, patientLength
        })
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const getAllPatients = async (req, res) => {//
    try {
        const { branch } = req.params;
        let patients, allBranchPatients;
    
        if (!branch || branch === "null" || branch === "undefined") {
            patients = await Patient.find();
        }
        else {
            allBranchPatients = await Patient.find({ branch });
        }
        return res.json({
            patients,
            allBranchPatients
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const getPatient = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findById(id);
        res.json({
            patient,
            success: true
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const getAppointmentsRec = async (req, res) => {//
    try {
        const { branch, shift } = req.params;
        const date = updateDate();
        const result = await Appointment.aggregate([
            {
                $match: {
                    date,
                    complete_appointment_flag: false,
                    medicine_issued_flag: false,
                    branch: branch,
                    appointmentType: { $in: ['general', 'repeat', 'courier'] },
                    shift:shift
                }
            },
            {
                $group: {
                    _id: {
                        branch: "$branch",
                        appointmentType: "$appointmentType",
                        shift:"$shift"
                    },
                    count: { $sum: 1 }
                }
            }
        ]);

        const counts = {
            generalAppointments: 0,
            repeatAppointments: 0,
            courierAppointments: 0,
        };

        result.forEach(({ _id, count }) => {
            const key = `${_id.appointmentType}Appointments`;
            counts[key] = count;
        });

        res.json({
            success: true,
            ...counts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

export const getAppDetails = async (req, res) => {
    try {
        const { branch, appointmentType,shift } = req.params;
       
        const date = updateDate();
        const appointments = await Appointment.find({ branch, date, appointmentType, shift }).populate('Doctor').populate('PatientCase');

        res.json({
            success: true,
            appointments
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const getAppointmentLength = async (req, res) => {
    try {
        const { branch,shift } = req.params;
        const todayDate = updateDate();
        const appointmentsLength = await Appointment.countDocuments({ branch, date: todayDate, shift });
        const pendingAppointmentLength = await Appointment.countDocuments({ branch, date: todayDate, shift, complete_appointment_flag: false, medicine_issued_flag: false });
        const completeAppointmentLength = await Appointment.countDocuments({ branch, date: todayDate, complete_appointment_flag: true, shift, medicine_issued_flag: true });
        res.json({
            appointmentsLength, pendingAppointmentLength, completeAppointmentLength
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const getDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await Employee.findById(id);
        return res.json({
            doctor
        });
    } catch (error) {
        return res.json({
            message: error.message
        });
    }
}

export const setShift = async (req, res) => {
    try {
        const { shift,role,user } = req.body;
        const hello = await Shift.updateOne(
                    { role: role, user },
                    { $set: { shift } },
                    { upsert: true }
        );
        return res.json({
            success: true,
            message:"Shift Added"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
}

export const getShift = async (req, res) => {
    try {
        const { user, role } = req.params;
        const shift = await Shift.findOne({user,role});
        return res.json({
            success: true,
            shift
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
}
