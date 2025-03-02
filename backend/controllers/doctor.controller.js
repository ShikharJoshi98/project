import mongoose from "mongoose";
import { AppointmentDoctor } from "../models/AppointmentModel.js";
import { Employee } from "../models/EmployeeModel.js";
import { Homeo } from "../models/HomeobhagwatModel.js";
import { LeaveApplication } from "../models/LeaveApplyModel.js";
import Patient from "../models/PatientModel.js";
import { Task } from "../models/TaskModel.js";

export const assignTask = async (req, res) => {

    try {
        const { task, username } = req.body;
        const employeeExists = await Employee.findOne({ username });
        if (!employeeExists) {
            res.json({ success: false, message: "employee does not exist" });
        }
        const newTask = new Task({
            task,
            username
        })
        await newTask.save();
        res.json({
            success: true,
            newTask
        })
    } catch (error) {
        res.json({ error: error.message })
    }
}
export const taskDetails = async (req, res) => {
    try {

        const tasks = await Task.find()
        res.json({
            success: true,
            tasks
        })
    } catch (error) {
        res.json({ error: error.message })
    }
}
export const DeleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            res.json({ success: false, message: "Task not found" })
        }
        res.json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
        res.json({ error: error.message });
    }
}

export const updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.body;

        const task = await Task.findByIdAndUpdate(
            id,
            { status: "COMPLETED" },
            { new: true, runValidators: true }
        );
        res.json({
            success: true,
            task
        })
    } catch (error) {
        res.json({ error: error.message })
    }
}
export const leaveDetails = async (req, res) => {
    try {
        const leaves = await LeaveApplication.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            leaves
        })
    } catch (error) {
        res.json({
            success: false, message: error.message
        })
    }
}
export const updateleave = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedleave = await LeaveApplication.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );
        if (!updatedleave) {
            res.json({
                success: false, message: "Failed in updating status"
            })
        }
        res.json({
            success: true,
            updatedleave
        })
    } catch (error) {
        res.json({
            success: false, message: error.message
        })
    }
}
export const AppointmentDoc = async (req, res) => {
    try {
        let { AppointmentDate, Time, PatientCase, Doctor, AppointmentType } = req.body;
        console.log("Incoming Data:", req.body);


        const newAppointment = new AppointmentDoctor({
            AppointmentDate, Time, PatientCase, Doctor, AppointmentType
        })

        await newAppointment.save();
        res.json({
            success: true,
            newAppointment
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const HomeoBhagwat = async (req, res) => {

    try {
        const { name, description, section } = req.body;
        const newInfo = new Homeo({
            name,
            description,
            section
        })
        await newInfo.save();
        res.json({
            success: true,
            newInfo
        })
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    }
}
export const getHomeoBhagwat = async (req, res) => {

    try {
        const Info = await Homeo.find();
        res.json({
            success: true,
            Info
        })
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    }
}
export const updateHomeoBhagwat = async (req, res) => {

    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const UpdatedInfo = await Homeo.findByIdAndUpdate(
            id,
            { name, description },
            { new: true, runValidators: true }
        );
        res.json({
            success: true,
            UpdatedInfo
        })
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    }
}

export const uploadCaseImage = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findById(id);

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

        // Store the Base64 image in the database
        patient.caseImages.push({ imageUrl: base64Image });
        await patient.save();

        res.status(200).json({ message: "Image uploaded successfully", patient });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const uploadDiagnosisImage = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findById(id);

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

        patient.diagnosisImages.push({ imageUrl: base64Image });
        await patient.save();

        res.status(200).json({ message: "Image uploaded successfully", patient });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getPatientImages = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findById(id);

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.status(200).json({ caseImages: patient.caseImages });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const getDiagnosisImages = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findById(id);

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.status(200).json({ diagnosisImages: patient.diagnosisImages });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteHomeoBhagwatcol = async (req, res) => {
    try {
        const { id } = req.params;
        const homeo = await Homeo.findByIdAndDelete(id);
        if (!homeo) {
            res.json({ success: false, message: "Cannot find" });
        }
        res.json({ success: true, message: "Deleted Successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
export const getPatientAppDetails = async (req, res) => {
    try {
        const { AppointmentType } = req.params;
        let appointment = await AppointmentDoctor.find(AppointmentType).populate('PatientCase').populate('Doctor');

        appointment = appointment.reverse();
        return res.json(appointment);
    } catch (error) {
        console.log("Error in test API", error.message);
        return res.json({
            message: error.message
        });
    }
}

export const deleteCaseImages = async (req, res) => {
    const { patientId, imageId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(imageId)) {
            return res.status(400).json({ message: "Invalid Image ID" });
        }

        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        patient.caseImages = patient.caseImages.filter(img => img._id.toString() !== imageId);

        await patient.save();

        res.json({ success: true, message: "Image deleted successfully" });
    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).json({ error: "Failed to delete image" });
    }
};
export const deleteDiagnosisImages = async (req, res) => {
    const { patientId, imageId } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(imageId)) {
            return res.status(400).json({ message: "Invalid Image ID" });
        }

        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        patient.diagnosisImages = patient.diagnosisImages.filter(img => img._id.toString() !== imageId);

        await patient.save();
        res.json({ success: true, message: "Image deleted successfully" });

    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).json({ error: "Failed to delete image" });
    }
};

export const addHealthRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const { weight, bloodPressure, date } = req.body;

        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        patient.healthRecords.push({
            weight,
            bloodPressure,
            date
        });

        await patient.save();

        res.status(200).json({ message: "Health record updated successfully", patient });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
export const deleteHealthRecord = async (req, res) => {
    try {
        const { id, recordId } = req.params;

        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        patient.healthRecords = patient.healthRecords.filter(record => record._id.toString() !== recordId);


        await patient.save();

        res.status(200).json({ message: "Health record updated successfully", patient });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const uploadFollowUpImage = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findById(id);

        if (!patient) {
            console.log('no patient');
            return res.status(404).json({ message: "Patient not found" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

        patient.followUpImages.push({ imageUrl: base64Image });
        await patient.save();

        res.status(200).json({ message: "Image uploaded successfully", patient });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const uploadComplaintImage = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findById(id);

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

        patient.diagnosisImages.push({ imageUrl: base64Image });
        await patient.save();

        res.status(200).json({ message: "Image uploaded successfully", patient });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getFollowUpImages = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findById(id);

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.status(200).json({
            followUpImages : patient.followUpImages
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteFollowUpImages = async (req, res) => {
    const { patientId, imageId } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(imageId)) {
            
            return res.status(400).json({ message: "Invalid Image ID" });
        }
       
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        patient.followUpImages = patient.followUpImages.filter(img => img._id.toString() !== imageId);
    

        await patient.save();
        res.json({ success: true, message: "Image deleted successfully" });

    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).json({ error: "Failed to delete image" });
    }
};