import bcryptjs from "bcryptjs";
import Patient from "../models/PatientModel.js";
import { Appointment } from "../models/AppointmentModel.js";

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
        const { page } = req.query;
        const { search = "" } = req.query;
        const pageNum = Number(page) || 1;
        const limitNum = 10;
        const skipPage = (pageNum - 1) * limitNum;

        const searchQuery = {
            $or: [
                { fullname: { $regex: search, $options: "i" } },
                { casePaperNo: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } }
            ]
        };

        const patientLength = await Patient.countDocuments();
        const patients = await Patient.find(search ? searchQuery : {}).skip(skipPage).limit(limitNum);
        res.json({
            success: true, patients, patientLength
        })
    } catch (error) {
        res.json({ success: false, message: error.message });
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

export const getAppointment = async (req, res) => {
    try {
        const { branch } = req.params;
        const appointments = await Appointment.find({ branch }).populate('Doctor').populate('PatientCase');
        res.json({
            appointments,
            success: true
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}