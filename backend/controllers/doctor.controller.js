import mongoose from "mongoose";
import { Appointment, ConsultationCharges, consultationChargesPrice } from "../models/AppointmentModel.js";
import { Employee } from "../models/EmployeeModel.js";
import { Homeo } from "../models/HomeobhagwatModel.js";
import { LeaveApplication } from "../models/LeaveApplyModel.js";
import Patient, { CaseImage, FollowUpPatient, Investigation, OtherPrescription, otherPrescriptionPrice, Prescription, PresentComplaintScribble, PresentComplaintWriteUp, ReportImage, WriteUpPatient } from "../models/PatientModel.js";
import { Task } from "../models/TaskModel.js";
import { BriefMindSymptomScribble, BriefMindSymptomsMaster, ChiefComplaintScribble, FamilyHistoryPatient, FamilyMedicalMaster, MentalCausativeMaster, MentalCausativePatient, MentalCausativeScribble, MentalPersonalityMaster, MentalPersonalityPatient, MentalPersonalityScribble, MiasmMaster, MiasmPatient, PastHistoryMaster, PastHistoryPatient, PersonalHistoryScribble, PresentComplaintsMaster, PresentComplaintsPatient, Relation, ThermalReactionMaster, ThermalReactionPatient } from "../models/NewCasePatient.js";
import { ctScan, dopplerStudies, investigationAdvised, mriScan, obsetrics, sonography, testTable, ultraSonography, XRay } from "../models/InvestigationModel.js";
import { billPayment, fees } from "../models/PaymentModel.js";
import { ItemStock, Order, OrderPaymentDetails } from "../models/ItemModel.js";
import { medicalOrder, MedicalStock, OrderMedicalPaymentDetails } from "../models/MedicineModel.js";
import { BillInvoice, Certificate } from "../models/CertificateModel.js";
import { updateDate } from "../utils/todayDate.js";
import { receiveOrderHelper } from "./HR.controller.js";
import { ItemVendor, MedicalVendor } from "../models/VendorModel.js";
import sendWhatsAppMessage, { sendAppointmentPatientEmail, sendCourierPatientEmail, sendPaymentEmail } from "../utils/sendPaymentDetails.js";
import { Clinic } from "../models/ClinicModel.js";

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
        const { id } = req.params;
        let leaves, userLeaves;
        if (!id || id === null || id === 'undefined') {
            leaves = await LeaveApplication.find().populate('employee').sort({ createdAt: -1 });
        }
        else {
            userLeaves = await LeaveApplication.find({ employee: id }).sort({ createdAt: -1 });
        }

        res.json({
            success: true,
            leaves,
            userLeaves
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

//appointments
export const createNewAppointment = async (req, res) => {//
    try {
        let { date, time, PatientCase, Doctor, appointmentType, shift } = req.body;
        const patient = await Patient.findById(PatientCase);
        const dateConverter = (date) => {
            const [y, m, d] = date.split('-');
            const newDate = String(d + '-' + m + '-' + y);
            return newDate;
        }
        const convertedDate = dateConverter(date);
        const appointmentExist = await Appointment.findOne({
            PatientCase: PatientCase.toString(),
            date: convertedDate,
        })
        if (appointmentExist) {
            return res.json({
                message: "Appointment exist"
            })
        }
        const pastAppointment = await Appointment.find({ PatientCase: PatientCase.toString() });
        let newAppointment;

        if (pastAppointment.length > 0 && pastAppointment[pastAppointment.length - 1].new_appointment_flag === false) {
            newAppointment = await Appointment.create({
                date: convertedDate,
                time,
                PatientCase: PatientCase.toString(),
                Doctor,
                appointmentType,
                branch: patient.branch,
                new_appointment_flag: false,
                followUp_appointment_flag: true,
                shift
            })
        }
        else {
            newAppointment = await Appointment.create({
                date: convertedDate,
                time,
                PatientCase: PatientCase.toString(),
                Doctor,
                appointmentType,
                branch: patient.branch,
                shift
            })
        }

        res.json({
            newAppointment
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const getIncompleteAppointments = async (req, res) => {
    try {
        const { shift, user, isBranch } = req.query;
        const todayDate = updateDate();
        
        const appointments = await Appointment.find({
            date: todayDate,
            complete_appointment_flag: false,
            Doctor: user,
            shift,
            branch: isBranch
        })
        
        const domCounts = {
            domGeneral: 0,
            domRepeat: 0,
            domCourier: 0
        };

        const mulCounts = {
            mulGeneral: 0,
            mulRepeat: 0,
            mulCourier: 0
        }

        appointments.forEach((appointment) => {
            const { branch, appointmentType } = appointment;
            if (branch === 'Dombivali') {
                if (appointmentType === 'general') domCounts.domGeneral++;
                else if (appointmentType === 'repeat') domCounts.domRepeat++;
                else if (appointmentType === 'courier') domCounts.domCourier++;
            }
            else if (branch === 'Mulund') {
                if (appointmentType === 'general') mulCounts.mulGeneral++;
                else if (appointmentType === 'repeat') mulCounts.mulRepeat++;
                else if (appointmentType === 'courier') mulCounts.mulCourier++; 
            }
        });
        
        return res.json({
            domCounts,
            mulCounts,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export const getAppointments = async (req, res) => {
    try {
        const { branch, appointmentSection, doctor, shift } = req.query;
        const todayDate = updateDate();
        const Appointments = await Appointment.find({
            date: todayDate,
            branch,
            appointmentType: appointmentSection,
            Doctor: doctor,
            shift
        })
            .populate('PatientCase')
            .populate('Doctor');
        const counts = {
            newAppointmentLength: 0,
            followUpAppointmentLength: 0,
            medicineIssuedLength: 0,
            medicineNotIssuedLength: 0
        };

        Appointments.forEach((appointment) => {
            const {
                new_appointment_flag,
                medicine_issued_flag,
                followUp_appointment_flag,
                complete_appointment_flag
            } = appointment;

            if (
                new_appointment_flag === true &&
                medicine_issued_flag === false &&
                followUp_appointment_flag === false &&
                complete_appointment_flag === false
            ) {
                counts.newAppointmentLength++;
            } else if (
                new_appointment_flag === false &&
                medicine_issued_flag === false &&
                followUp_appointment_flag === true &&
                complete_appointment_flag === false
            ) {
                counts.followUpAppointmentLength++;
            } else if (
                complete_appointment_flag === true &&
                medicine_issued_flag === true &&
                new_appointment_flag === false
            ) {
                counts.medicineIssuedLength++;
            } else if (
                complete_appointment_flag === true &&
                medicine_issued_flag === false
            ) {
                counts.medicineNotIssuedLength++;
            }
        });

        res.json({
            Appointments,
            ...counts,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateAppointment = async (req, res) => {
    try {
        const { new_appointment_flag, complete_appointment_flag, medicine_issued_flag, followUp_appointment_flag,visit_complete_flag, date } = req.body;
        const { id } = req.params;
        const updated = {};
        if (new_appointment_flag !== undefined) {
            updated.new_appointment_flag = new_appointment_flag;
        }
        if (complete_appointment_flag !== undefined) {
            updated.complete_appointment_flag = complete_appointment_flag;
        }
        if (medicine_issued_flag !== undefined) {
            updated.medicine_issued_flag = medicine_issued_flag;
        }
        if (followUp_appointment_flag !== undefined) {
            updated.followUp_appointment_flag = followUp_appointment_flag;
        }
        if (followUp_appointment_flag !== undefined) {
            updated.visit_complete_flag = visit_complete_flag;
        }
        const appointment = await Appointment.findOneAndUpdate({ PatientCase: id, date }, updated,
            { new: true });
        res.json({
            success: true,
            appointment
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
        const { image, date } = req.body;

        const caseImage = await CaseImage.create({
            patient: id,
            case_Image_string: image,
            date
        });

        res.status(200).json({ message: "Image uploaded successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const uploadDiagnosisImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { image, date } = req.body;

        const reportImage = await ReportImage.create({
            patient: id,
            report_Image_string: image,
            date
        });

        res.status(200).json({ message: "Image uploaded successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getPatientImages = async (req, res) => {
    try {
        const { id } = req.params;
        const images = await CaseImage.find({ patient: id });

        let combineObject = {};
        images?.forEach(item => {
            if (!combineObject[item?.date]) {
                combineObject[item.date] = {
                    date: item?.date,
                    images: []
                }
            }
            combineObject[item?.date].images.push({
                images: item?.
                    case_Image_string, id: item?._id
            });
        })
        const combinedArray = Object.values(combineObject).sort((a, b) => new Date(b.date) - new Date(a.date)).reverse();

        res.status(200).json({ success: true, combinedArray });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const getDiagnosisImages = async (req, res) => {
    try {
        const { id } = req.params;
        const images = await ReportImage.find({ patient: id });

        let combineObject = {};
        images?.forEach(item => {
            if (!combineObject[item?.date]) {
                combineObject[item.date] = {
                    date: item?.date,
                    images: []
                }
            }
            combineObject[item?.date].images.push({
                images: item?.report_Image_string,
                id: item?._id
            });
        })
        const combinedArray = Object.values(combineObject).sort((a, b) => new Date(b.date) - new Date(a.date)).reverse();

        res.status(200).json({ success: true, combinedArray });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteHomeoBhagwatcol = async (req, res) => {//
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

export const deleteCaseImages = async (req, res) => {
    try {
        const { patientId, imageId } = req.params;
        const deletedCaseImage = await CaseImage.findOneAndDelete({
            patient: patientId,
            _id: imageId,
        });

        res.json({ success: true, message: "Image deleted successfully" });
    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).json({ error: "Failed to delete image" });
    }
};

export const deleteDiagnosisImages = async (req, res) => {
    try {
        const { patientId, imageId } = req.params;
        const deletedReportImage = await ReportImage.findOneAndDelete({
            patient: patientId,
            _id: imageId,
        });

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
            followUpImages: patient.followUpImages
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteFollowUpPatient = async (req, res) => {
    try {
        const { patientId, imageId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(imageId)) {
            return res.status(400).json({ message: "Invalid Image ID" });
        }

        const deletedFollowUp = await FollowUpPatient.findOneAndDelete({
            patient: patientId,
            _id: imageId,
        });

        if (!deletedFollowUp) {
            return res.status(404).json({ message: "Follow-up record not found" });
        }

        return res.json({
            success: true,
            message: "Follow-up record deleted successfully",
        });

    } catch (error) {
        console.error("Error in deleteFollowUpPatient controller:", error.message);
        return res.status(500).json({ error: "Failed to delete follow-up record" });
    }
};

export const addDiagnosis = async (req, res) => {
    try {
        const { diagnosis } = req.body;
        const { id } = req.params;

        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        if (!patient.patientDiagnosis.includes(diagnosis)) {
            patient.patientDiagnosis.push(diagnosis);
            await patient.save();
        }

        res.status(200).json({ message: "Diagnosis added successfully", patient });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getDiagnosis = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findById(id);

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.status(200).json({ diagnosis: patient.patientDiagnosis });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

//PRESCRIPTIONS
export const addNewPrescription = async (req, res) => {
    try {
        const { formData, currentDate } = req.body;
        const { id } = req.params;

        const addDays = (dateStr, days) => {
            days = parseInt(days, 10);
            let [day, month, year] = dateStr.split("-").map(Number);
            let date = new Date(year, month - 1, day);
            date.setDate(date.getDate() + days);
            let newDay = String(date.getDate()).padStart(2, '0');
            let newMonth = String(date.getMonth() + 1).padStart(2, '0');
            let newYear = date.getFullYear();
            return `${newDay}-${newMonth}-${newYear}`;
        };

        const next_visit = addDays(currentDate, formData.duration);

        const newPatient = await Prescription.create({
            patient: id,
            diagnosis: formData.selectedDiagnosisOptions,
            medicine: formData.medicine,
            potency: formData.potency,
            start_date: formData.startDate,
            dose: formData.dose,
            duration: formData.duration,
            note: formData.note,
            prescription_date: currentDate,
            next_visit,
            send_to_HR: true
        });


        return res.json({
            message: "Prescription Created Successfully"
        });

    } catch (error) {
        console.log("Error in addNewPrescription controller", error.message);
        return res.json({
            message: error.message
        });
    }
};

export const getPrescriptionToday = async (req, res) => {
    try {
        const { id } = req.params;
        let formattedDate = '';
        const updateDate = () => {
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            formattedDate = `${day}-${month}-${year}`;
        };
        updateDate();

        const presToday = await Prescription.find({
            patient: id,
            prescription_date: formattedDate
        });

        return res.json({
            presToday
        })

    } catch (error) {
        console.log("Error in getPrescriptionToday", error.message);
        return res.json({
            message: error.message
        })
    }
}

export const getAllPrescription = async (req, res) => {
    try {
        const { id } = req.params;

        const presToday = await Prescription.find({
            patient: id
        });

        return res.json({
            presToday
        })

    } catch (error) {
        console.log("Error in getAllPrescription controller", error.message);
        return res.json({
            message: error.message
        })
    }
}

export const deleteTodayPrescription = async (req, res) => {
    try {
        const id = req.params.id;
        const deletePrescription = await Prescription.findByIdAndDelete(id);
        return res.json({
            message: "Deleted Successfully"
        });
    } catch (error) {
        console.log("Error in deleteTodayPrescription controller", error.message);
        return res.json({
            message: error.message
        });
    }
}

export const updatePresInfo = async (req, res) => {
    try {
        const { prescription_date } = req.body;

        await Prescription.updateMany(
            { prescription_date },
            { $set: { medicine_issued_flag: true } }
        );

        res.json({
            message: "Medicine Issued",
            success: true
        });
    } catch (error) {
        console.error("Error updating prescriptions:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const updateTodayPrescription = async (req, res) => {
    try {
        const { editedData } = req.body;
        const { id } = req.params;
        delete editedData._id;
        delete editedData.patient;
        delete editedData.__v;

        const updatePrescription = await Prescription.findByIdAndUpdate(id, editedData);

        return res.json({
            message: "Updated Successfully"
        })

    } catch (error) {
        console.log("Error in updateTodayPrescription", error.message);
        return res.json({
            message: error.message
        });
    }
}

export const addOtherPrescription = async (req, res) => {
    try {
        const { id } = req.params;
        const { medicineName, price } = req.body;
        let formattedDate;
        const updateDate = () => {
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            formattedDate = `${day}-${month}-${year}`;
        };
        updateDate();
        const response = await OtherPrescription.create({
            patient: id,
            medicineName,
            price,
            date: formattedDate
        })
        return res.json({
            success: true,
            message: "Other Prescription Added"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: "Error in Other Prescription"
        })
    }
}

export const getOtherPrescription = async (req, res) => {
    try {
        const { id } = req.params;
        const otherPrescription = await OtherPrescription.find({ patient: id, date: updateDate() });

        return res.json({
            success: true,
            otherPrescription
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const deleteOtherPrescription = async (req, res) => {
    try {
        const { id } = req.params;
        await OtherPrescription.findByIdAndDelete(id);
        res.json({
            success: true,
            message: "Deleted Successfully"
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Error in delete other prescription"
        })
    }
}

export const updateOtherPrescription = async (req, res) => {
    try {
        const { id } = req.params;
        const prescription = await OtherPrescription.findOne({ patient: id })
        prescription.medicine_issued_flag = true;
        await prescription.save();
        res.json({
            success: true,
            prescription
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const addOtherPrescriptionPrice = async (req, res) => {
    try {
        const { price } = req.body;
        await otherPrescriptionPrice.create({
            price
        })
        res.json({
            success: true,
            message: "Added Other Prescription Price"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const getOtherPrescriptionPrice = async (req, res) => {
    try {
        const prices = await otherPrescriptionPrice.find().sort({ price: 1 });
        res.json({
            prices,
            success: true
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const getPrescriptions = async (req, res) => {
    try {
        const allPrescriptions = await Prescription.find().populate('patient');
        res.json({
            allPrescriptions,
            success: true
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

//FOLLOW-UP SCRIBBLE
export const addFollowUpPatient = async (req, res) => {
    try {
        const id = req.params.id;
        const image = req.body.savedImage;
        const date = new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            timeZone: "Asia/Kolkata",
        });

        const addFollowUp = await FollowUpPatient.create({
            patient: id,
            follow_string: image,
            date
        })

        return res.json({
            success: true
        })

    } catch (error) {
        console.log("Error in addFollowUpPatient controller", error.message);
        return res.json({
            message: error.message
        });
    }
}

export const getHistoryDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const followUpImages = await FollowUpPatient.find({ patient: id }).sort({ date: -1 });
        const writeUp = await WriteUpPatient.find({ patient: id }).sort({ date: -1 });

        let combineObject = {};

        writeUp?.forEach(item => {
            if (!combineObject[item?.date]) {
                combineObject[item.date] = {
                    date: item?.date,
                    followUps: [],
                    writeUps: []
                };
            }
            combineObject[item?.date].writeUps.push({ writeUp: item?.writeUp_value, id: item?._id });
        });

        followUpImages?.forEach(item => {
            if (!combineObject[item?.date]) {
                combineObject[item.date] = {
                    date: item?.date,
                    followUps: [],
                    writeUps: []
                };
            }
            combineObject[item?.date].followUps.push({ followUp: item?.follow_string, id: item?._id });
        });

        const combinedArray = Object.values(combineObject).sort((a, b) => new Date(b.date) - new Date(a.date)).reverse();
        res.json({ success: true, combinedArray });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

export const getPresentComplaintHistory = async (req, res) => {
    try {
        const { id } = req.params;

        const scribble = await PresentComplaintScribble.find({ patient: id }).sort({ date: -1 });
        const writeUp = await PresentComplaintWriteUp.find({ patient: id }).sort({ date: -1 });
        let combineObject = {};

        writeUp?.forEach(item => {
            if (!combineObject[item?.date]) {
                combineObject[item.date] = {
                    date: item?.date,
                    scribble: [],
                    writeUps: []
                };
            }
            combineObject[item?.date].writeUps.push({ writeUp: item?.writeUp_value, id: item?._id });
        });

        scribble?.forEach(item => {
            if (!combineObject[item?.date]) {
                combineObject[item.date] = {
                    date: item?.date,
                    scribble: [],
                    writeUps: []
                };
            }
            combineObject[item?.date].scribble.push({ scribble: item?.follow_string, id: item?._id });
        });

        const combinedArray = Object.values(combineObject).sort((a, b) => new Date(b.date) - new Date(a.date)).reverse();
        res.json({ success: true, combinedArray });
    } catch (error) {
        res.js
    }
}


//FOLLOW-UP WRITE PAD
export const addWriteUpPatient = async (req, res) => {
    try {
        const { id } = req.params;
        const { value } = req.body;
        const date = new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            timeZone: "Asia/Kolkata",
        });

        const addWriteUp = await WriteUpPatient.create({
            patient: id,
            writeUp_value: value,
            date
        });

        return res.json({
            message: "Added Successfully"
        })

    } catch (error) {
        console.log("Error in addWriteUpPatient controller", error.message);
        return res.json({
            message: error.message
        })
    }
}

export const getWriteUpUpdate = async (req, res) => {
    try {
        const { id } = req.params;

        const updateWriteUp = await WriteUpPatient.findById(id);

        return res.json({
            updateWriteUp
        });

    } catch (error) {
        console.log("Error in getWriteUpUpdate controller", error.message);
        return res.json({
            message: error.message
        });
    }
}

export const deleteWriteUp = async (req, res) => {
    try {
        const { patientId, imageId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(imageId)) {
            return res.status(400).json({ message: "Invalid Image ID" });
        }

        const deletedFollowUp = await WriteUpPatient.findOneAndDelete({
            patient: patientId,
            _id: imageId,
        });

        if (!deletedFollowUp) {
            return res.status(404).json({ message: "Write-up record not found" });
        }

        return res.json({
            success: true,
            message: "Write-up record deleted successfully",
        });

    } catch (error) {
        console.error("Error in deleteFollowUpPatient controller:", error.message);
        return res.status(500).json({ error: "Failed to delete Write-up record" });
    }
};

//present complaints

export const addPresentComplaintScribble = async (req, res) => {
    try {
        const id = req.params.id;
        const image = req.body.savedImage;

        const date = new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            timeZone: "Asia/Kolkata",
        });

        const addPresentComplaint = await PresentComplaintScribble.create({
            patient: id,
            follow_string: image,
            date
        })

        return res.json({
            success: true
        })

    } catch (error) {
        console.log("Error in addPresentComplaintScribble controller", error.message);
        return res.json({
            message: error.message
        });
    }
}

export const addWriteUpPresentComplaint = async (req, res) => {
    try {
        const { id } = req.params;
        const { value } = req.body;
        const date = new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            timeZone: "Asia/Kolkata",
        });

        const addWriteUp = await PresentComplaintWriteUp.create({
            patient: id,
            writeUp_value: value,
            date
        });

        return res.json({
            message: "Added Successfully"
        })

    } catch (error) {
        console.log("Error in addWriteUpPresentComplaint controller", error.message);
        return res.json({
            message: error.message
        })
    }
}

export const getPresentComplaintScribble = async (req, res) => {
    try {
        const { id } = req.params;

        const presentComplaintScribble = await PresentComplaintScribble.find({
            patient: id
        })

        return res.json({
            presentComplaintScribble
        })

    } catch (error) {
        console.log("Error in presentComplaintScribble controller", error.message);
        return res.json({
            message: error.message
        });
    }
}

export const getWriteUpPresentComplaint = async (req, res) => {
    try {
        const { id } = req.params;

        const writeUpData = await PresentComplaintWriteUp.find({
            patient: id
        })

        return res.json({
            writeUpData
        });

    } catch (error) {
        console.log("Error in getWriteUpPresentComplaint controller", error.message);
        return res.json({
            message: error.message
        });
    }
}

export const deletePresentComplaintScribble = async (req, res) => {
    try {
        const { patientId, imageId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(imageId)) {
            return res.status(400).json({ message: "Invalid Image ID" });
        }

        await PresentComplaintScribble.findOneAndDelete({
            patient: patientId,
            _id: imageId,
        });

        return res.json({
            success: true,
            message: "Present Complaint record deleted successfully",
        });

    } catch (error) {
        console.error("Error in Present Complaint delete controller:", error.message);
        return res.status(500).json({ error: "Failed to delete  Present Complaint record" });
    }
};

export const deletePresentComplaintWriteUp = async (req, res) => {
    try {
        const { patientId, imageId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(imageId)) {
            return res.status(400).json({ message: "Invalid Image ID" });
        }

        await PresentComplaintWriteUp.findOneAndDelete({
            patient: patientId,
            _id: imageId,
        });

        return res.json({
            success: true,
            message: "Write-up record deleted successfully",
        });

    } catch (error) {
        console.error("Error in deletePresentComplaintWriteUp controller:", error.message);
        return res.status(500).json({ error: "Failed to delete Write-up record" });
    }
};


//investigation

export const addInvestigationAdvised = async (req, res) => {
    try {
        const { inputData, type } = req.body;
        
        switch (type) {
            case 'Blood Test':
                await investigationAdvised.create({ inputData: inputData.trim() })
                break;
            case 'X-RAY':
                await XRay.create({ inputData: inputData.trim() })
                break;
            case 'Ultra-Sonography':
                await ultraSonography.create({ inputData: inputData.trim() })
                break;
            case 'Doppler Studies':
                await dopplerStudies.create({ inputData: inputData.trim() })
                break;
            case 'Obstetrics(Pregnancy)-Sonography':
                await obsetrics.create({ inputData: inputData.trim() })
                break;
            case '16 Slice C.T Scan':
                await ctScan.create({ inputData: inputData.trim() })
                break;
            case '1.5 MRI Scan':
                await mriScan.create({ inputData: inputData.trim() })
                break;
        }
        res.json({
            success: true,
            message: "data added successfully"
        })

    } catch (error) {
        console.log("Error in addInvestigationAdvised controller", error.message);
        return res.json({
            message: error.message
        });
    }
}

export const getInvestigationAdvised = async (req, res) => {
    try {
        const { type } = req.params;
        let response;
        switch (type) {
            case 'Blood Test':
                response = await investigationAdvised.find();
                break;
            case 'X-RAY':
                response = await XRay.find();
                break;
            case 'Ultra-Sonography':
                response = await ultraSonography.find();
                break;
            case 'Doppler Studies':
                response = await dopplerStudies.find();
                break;
            case 'Obstetrics(Pregnancy)-Sonography':
                response = await obsetrics.find();
                break;
            case '16 Slice C.T Scan':
                response = await ctScan.find();
                break;
            case '1.5 MRI Scan':
                response = await mriScan.find();
                break;
        }
        res.json({
            success: true,
            response
        })
    } catch (error) {
        console.log("Error in getInvestigationAdvised", error.message);
        return res.json({
            message: error.message
        });
    }
}

export const getSelectedTest = async (req, res) => {
    try {
        const { id } = req.params;
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const testData = await testTable.findOne({
            patient: id,
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        });

        res.json({
            success: true,
            testData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteInvestigationAdvised = async (req, res) => {
    try {
        const { id, type } = req.params;

        switch (type) {
            case 'Blood Test':
                await investigationAdvised.findByIdAndDelete(id);
                break;
            case 'X-RAY':
                await XRay.findByIdAndDelete(id);
                break;
            case 'Ultra-Sonography':
                await ultraSonography.findByIdAndDelete(id);
                break;
            case 'Doppler Studies':
                await dopplerStudies.findByIdAndDelete(id);
                break;
            case 'Obstetrics(Pregnancy)-Sonography':
                response = await obsetrics.findByIdAndDelete(id);
                break;
            case '16 Slice C.T Scan':
                await ctScan.findByIdAndDelete(id);
                break;
            case '1.5 MRI Scan':
                await mriScan.findByIdAndDelete(id);
                break;
        }

        res.json({
            success: true,
            message: "Deleted successfully"
        })
    } catch (error) {
        console.log("Error in deleteInvestigationAdvised", error.message);
        return res.json({
            message: error.message
        });
    }
}

export const addInvestigationInfo = async (req, res) => {
    try {
        const { selectedInvestigationOptions, investigationType } = req.body;
        let { id } = req.params;
        let test = await testTable.findOne({ patient: id });

        if (!test) {
            test = new testTable({ patient: id });
        }
        if (investigationType === 'Blood Test') {
            test['investigationAdvised'].push(...selectedInvestigationOptions);
        }
        else if (investigationType === 'X-RAY') {
            test['xray'].push(...selectedInvestigationOptions);
        }
        else if (investigationType === 'Ultra-Sonography') {
            test['ultra_sonography'].push(...selectedInvestigationOptions);
        }
        else if (investigationType === 'Doppler Studies') {
            test['dopplerStudies'].push(...selectedInvestigationOptions);
        }
        else if (investigationType === 'Obstetrics(Pregnancy)-Sonography') {
            test['obsetrics'].push(...selectedInvestigationOptions);
        }
        else if (investigationType === '16 Slice C.T Scan') {
            test['ctScan'].push(...selectedInvestigationOptions);
        }
        else if (investigationType === '1.5 MRI Scan') {
            test['mriScan'].push(...selectedInvestigationOptions);
        }
        await test.save();
        res.json({
            success: true,
            message: 'Added Test'
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const getInvestigationInfo = async (req, res) => {
    try {
        let { id, investigationType } = req.params;
        const patientInvestigationInfo = await testTable.findOne({ patient: id });
        let investigationInfo;
        if (investigationType === 'Blood Test') {
            investigationInfo = patientInvestigationInfo.investigationAdvised;
        }
         else if (investigationType === 'X-RAY') {
            investigationInfo = patientInvestigationInfo.xray;
        }
        else if (investigationType === 'Ultra-Sonography') {
            investigationInfo = patientInvestigationInfo.ultra_sonography;
        }
        else if (investigationType === 'Doppler Studies') {
            investigationInfo = patientInvestigationInfo.dopplerStudies;
        }
        else if (investigationType === 'Obstetrics(Pregnancy)-Sonography') {
            investigationInfo = patientInvestigationInfo.obsetrics;
        }
        else if (investigationType === '16 Slice C.T Scan') {
            investigationInfo = patientInvestigationInfo.ctScan;
        }
        else if (investigationType === '1.5 MRI Scan') {
            investigationInfo = patientInvestigationInfo.mriScan;
        }
        res.json({
            investigationInfo
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const deleteInvestigationInfo = async (req, res) => {
    try {
        let { investigationType, id, test } = req.params;
        const testInfo = await testTable.findOne({ patient: id });
        let val;
        if (investigationType === 'Blood Test') {
            val = testInfo.investigationAdvised.filter((investigation) => investigation !== test);
            testInfo.investigationAdvised = val;
        }
        else if (investigationType === 'X-RAY') {
            val = testInfo.xray.filter((investigation) => investigation !== test);
            testInfo.xray = val;
        }
        else if (investigationType === 'Ultra-Sonography') {
            val = testInfo.ultra_sonography.filter((investigation) => investigation !== test);
            testInfo.ultra_sonography = val;
        }
        else if (investigationType === 'Doppler Studies') {
            val = testInfo.dopplerStudies.filter((investigation) => investigation !== test);
            testInfo.dopplerStudies = val;
        }
        else if (investigationType === 'Obstetrics(Pregnancy)-Sonography') {
            val = testInfo.obsetrics.filter((investigation) => investigation !== test);
            testInfo.obsetrics = val;
        }
        else if (investigationType === '16 Slice C.T Scan') {
            val = testInfo.ctScan.filter((investigation) => investigation !== test);
            testInfo.ctScan = val;
        }
        else if (investigationType === '1.5 MRI Scan') {
            val = testInfo.mriScan.filter((investigation) => investigation !== test);
            testInfo.mriScan = val;
        }
        await testInfo.save();
        res.json({
            val
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByIdAndDelete(id);
        if (!employee) {
            res.json({ success: false, message: "Cannot find" });
        }
        res.json({ success: true, message: "Deleted Successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

//add new case master controllers
export const addNewCaseMaster = async (req, res) => {
    try {
        const { name, type } = req.body;

        switch (type) {
            case "Present Complaints":
                await PresentComplaintsMaster.create({ name: name.trim() })
                break;
            case "Past History":
                await PastHistoryMaster.create({ name: name.trim() })
                break;
            case "Family Medical History":
                await FamilyMedicalMaster.create({ name: name.trim() })
                break;
            case "Mental Causative Factor":
                await MentalCausativeMaster.create({ name: name.trim() })
                break;
            case "Mental Personality Character":
                await MentalPersonalityMaster.create({ name: name.trim() })
                break;
            case "Brief Mind Symptoms":
                await BriefMindSymptomsMaster.create({ name: name.trim() })
                break;
            case "Thermal Reaction":
                await ThermalReactionMaster.create({ name: name.trim() })
                break;
            case "Miasm":
                await MiasmMaster.create({ name: name.trim() })
                break;
            default:
                console.log("Unexpected Type mentioned in Switch Case addNewCaseMaster")
        }

        return res.json({
            name,
            type
        });
    } catch (error) {
        console.log("Error in addPresentComplaints controller Doc", error.message);
        return res.json({
            message: error.message
        });
    };
};

export const getCaseMaster = async (req, res) => {
    try {
        const { id } = req.params;
        let caseData;
        switch (id) {
            case 'PresentComplaints':
                caseData = await PresentComplaintsMaster.find();
                break;
            case 'PastHistory':
                caseData = await PastHistoryMaster.find();
                break;
            case 'FamilyMedicalHistory':
                caseData = await FamilyMedicalMaster.find();
                break;
            case 'MentalCausativeFactor':
                caseData = await MentalCausativeMaster.find();
                break;
            case 'MentalPersonalityCharacter':
                caseData = await MentalPersonalityMaster.find();
                break;
            case 'ThermalReaction':
                caseData = await ThermalReactionMaster.find();
                break;
            case 'Miasm':
                caseData = await MiasmMaster.find();
                break;
            case 'BriefMindSymptoms':
                caseData = await BriefMindSymptomsMaster.find();
                break;
            default:
                console.log('Error in getting the Case Master');
        }
        return res.json({
            success: true,
            caseData
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const deleteCaseMaster = async (req, res) => {
    try {
        let { id, type } = req.params;

        switch (type) {
            case 'PresentComplaints':
                await PresentComplaintsMaster.findByIdAndDelete(id);
                break;
            case 'PastHistory':
                await PastHistoryMaster.findByIdAndDelete(id);
                break;
            case 'FamilyMedicalHistory':
                await FamilyMedicalMaster.findByIdAndDelete(id);
                break;
            case 'MentalCausativeFactor':
                await MentalCausativeMaster.findByIdAndDelete(id);
                break;
            case 'MentalPersonalityCharacter':
                await MentalPersonalityMaster.findByIdAndDelete(id)
                break;
            case 'ThermalReaction':
                await ThermalReactionMaster.findByIdAndDelete(id)
                break;
            case 'Miasm':
                await MiasmMaster.findByIdAndDelete(id)
                break;
            case 'BriefMindSymptoms':
                await BriefMindSymptomsMaster.findByIdAndDelete(id)
                break;
            default:
                console.log('Could not find the type')
        }
        return res.send({
            message: "Deleted Successfully"
        })
    } catch (error) {
        console.log(error.message);
    }
}

export const addPresentComplaintPatient = async (req, res) => {
    const { id } = req.params;
    const { complaintName, duration, durationSuffix, remark } = req.body;
    const date = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "Asia/Kolkata",
    });
    try {
        const addData = await PresentComplaintsPatient.create({
            patient: id,
            complaintName: complaintName.trim(),
            duration: duration.trim(),
            durationSuffix: durationSuffix.trim(),
            created_at: date,
            remark
        })

        return res.json({
            message: "Present Complaint Added Successfully",
        });
    } catch (error) {
        console.log("Error in addPresentComplaints controller Doc", error.message);
        return res.json({
            message: error.message
        });
    }
}

export const getPresentComplaintPatient = async (req, res) => {
    try {
        const { id } = req.params;
        const presentComplaintData = await PresentComplaintsPatient.find({ patient: id });
        res.json({
            success: true,
            presentComplaintData
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const deletePresentComplaintPatient = async (req, res) => {
    try {
        const { id } = req.params;
        await PresentComplaintsPatient.findByIdAndDelete(id);
        res.json({
            success: true,
            message: "Deleted Successfully"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const addPastHistoryPatient = async (req, res) => {
    const { id } = req.params;
    const { complaintName, lastDiagnosed, lastSuffix, duration, durationSuffix, remark } = req.body;
    const date = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "Asia/Kolkata",
    });
    try {
        const addData = await PastHistoryPatient.create({
            patient: id,
            complaintName: complaintName.trim(),
            lastDiagnosed,
            lastSuffix,
            duration: duration.trim(),
            durationSuffix: durationSuffix.trim(),
            remark: remark ? remark.trim() : "",
            created_at: date
        })

        return res.json({
            message: "Past History Added Successfully",
        });
    } catch (error) {
        console.log("Error in addPastHistoryPatient controller Doc", error.message);
        return res.json({
            message: error.message
        });
    }
}

export const getPastHistoryPatient = async (req, res) => {
    try {
        const { id } = req.params;
        const pastData = await PastHistoryPatient.find({ patient: id });

        return res.json({
            pastData,
            success: true
        })
    } catch (error) {
        return res.json({
            message: error.message,
            success: false
        })
    }
}

export const deletePastHistoryPatient = async (req, res) => {
    try {
        const { id } = req.params;
        await PastHistoryPatient.findByIdAndDelete(id);
        res.json({
            success: true,
            message: "Deleted Successfully"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const addFamilyMedicalPatient = async (req, res) => {
    const { id } = req.params;
    const { relation, diseases, anyOther, lifeStatus, age } = req.body;
    const date = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "Asia/Kolkata",
    });
    try {
        const addData = await FamilyHistoryPatient.create({
            patient: id,
            relation: relation.trim(),
            diseases,
            anyOther: anyOther ? anyOther.trim() : "",
            lifeStatus,
            age: age ? age.trim() : "",
            created_at: date
        })

        return res.json({
            message: "Family Medical History Added Successfully",
        });
    } catch (error) {
        console.log("Error in addFamilyMedicalPatient controller Doc", error.message);
        return res.json({
            message: error.message
        });
    }
}

export const getFamilyMedicalPatient = async (req, res) => {
    try {
        const { id } = req.params;
        const familyData = await FamilyHistoryPatient.find({ patient: id });

        return res.json({
            familyData,
            success: true
        })
    } catch (error) {
        return res.json({
            message: error.message,
            success: false
        })
    }
}

export const deleteFamilyMedical = async (req, res) => {
    try {
        const { id } = req.params;
        await FamilyHistoryPatient.findByIdAndDelete(id);
        res.json({
            success: true,
            message: "Deleted Successfully"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const addMentalCausativePatient = async (req, res) => {
    const { id } = req.params;

    const date = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "Asia/Kolkata",
    });
    try {
        const { selectedInvestigationOptions } = req.body;
        const existingDiseases = await MentalCausativePatient.find({ patient: id });
        if (existingDiseases.length !== 0) {
            await MentalCausativePatient.updateOne(
                { patient: id },
                {
                    $push: {
                        diseases: { $each: selectedInvestigationOptions },
                    },
                }
            );
        } else {
            await MentalCausativePatient.create({
                patient: id,
                diseases: selectedInvestigationOptions,
                created_at: date,
            });
        }

        return res.json({
            message: "Mental Causative Added Successfully",
        });
    } catch (error) {
        console.log("Error in addMentalCausativePatient controller Doc", error.message);
        return res.json({
            message: error.message
        });
    }
}

export const getMentalCausativePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const mentalCausativeData = await MentalCausativePatient.find({ patient: id });
        res.json({
            success: true,
            mentalCausativeData
        })
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const deleteMentalCausative = async (req, res) => {
    try {
        const { id, idx } = req.params;
        const mentalCausativeData = await MentalCausativePatient.findOne({ patient: id });
        if (idx !== -1) {
            mentalCausativeData.diseases.splice(idx, 1);
            await mentalCausativeData.save();
        }
        res.json({
            success: true,
            message: "Deleted Successfully"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const addMentalPersonalityPatient = async (req, res) => {
    const { id } = req.params;

    const date = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "Asia/Kolkata",
    });
    try {
        const { selectedInvestigationOptions } = req.body;
        const existingDiseases = await MentalPersonalityPatient.find({ patient: id });
        if (existingDiseases.length !== 0) {
            await MentalPersonalityPatient.updateOne(
                { patient: id },
                {
                    $push: {
                        diseases: { $each: selectedInvestigationOptions },
                    },
                }
            );
        } else {
            await MentalPersonalityPatient.create({
                patient: id,
                diseases: selectedInvestigationOptions,
                created_at: date,
            });
        }

        return res.json({
            message: "Mental Personality Added Successfully",
        });
    } catch (error) {
        console.log("Error in addMentalPersonalityPatient controller Doc", error.message);
        return res.json({
            message: error.message
        });
    }
}

export const getMentalPersonalityPatient = async (req, res) => {
    try {
        const { id } = req.params;
        const mentalPersonalityData = await MentalPersonalityPatient.find({ patient: id });
        res.json({
            success: true,
            mentalPersonalityData
        })
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const deleteMentalPersonality = async (req, res) => {
    try {
        const { id, idx } = req.params;
        const mentalPersonalityData = await MentalPersonalityPatient.findOne({ patient: id });
        if (idx !== -1) {
            mentalPersonalityData.diseases.splice(idx, 1);
            await mentalPersonalityData.save();
        }
        res.json({
            success: true,
            message: "Deleted Successfully"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const addThermalReactionPatient = async (req, res) => {
    const { id } = req.params;

    const date = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "Asia/Kolkata",
    });
    try {
        const { selectedInvestigationOptions } = req.body;
        const existingDiseases = await ThermalReactionPatient.find({ patient: id });
        if (existingDiseases.length !== 0) {
            await ThermalReactionPatient.updateOne(
                { patient: id },
                {
                    $push: {
                        diseases: { $each: selectedInvestigationOptions },
                    },
                }
            );
        } else {
            await ThermalReactionPatient.create({
                patient: id,
                diseases: selectedInvestigationOptions,
                created_at: date,
            });
        }

        return res.json({
            message: "THermal Reaction Added Successfully",
        });
    } catch (error) {
        console.log("Error in addthermalreaction controller Doc", error.message);
        return res.json({
            message: error.message
        });
    }
}

export const getThermalReactionPatient = async (req, res) => {
    try {
        const { id } = req.params;
        const thermalReactionData = await ThermalReactionPatient.find({ patient: id });
        res.json({
            success: true,
            thermalReactionData
        })
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const deleteThermalReaction = async (req, res) => {
    try {
        const { id, idx } = req.params;
        const thermalReactionData = await ThermalReactionPatient.findOne({ patient: id });

        if (idx !== -1) {
            thermalReactionData.diseases.splice(idx, 1);
            await thermalReactionData.save();
        }
        res.json({
            success: true,
            message: "Deleted Successfully"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const addMiasmPatient = async (req, res) => {
    const { id } = req.params;

    const date = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "Asia/Kolkata",
    });
    try {
        const { selectedInvestigationOptions } = req.body;
        const existingDiseases = await MiasmPatient.find({ patient: id });
        if (existingDiseases.length !== 0) {
            await MiasmPatient.updateOne(
                { patient: id },
                {
                    $push: {
                        diseases: { $each: selectedInvestigationOptions },
                    },
                }
            );
        } else {
            await MiasmPatient.create({
                patient: id,
                diseases: selectedInvestigationOptions,
                created_at: date,
            });
        }

        return res.json({
            message: "Miasm Added Successfully",
        });
    } catch (error) {
        console.log("Error in addMiasmPatient controller Doc", error.message);
        return res.json({
            message: error.message
        });
    }
}

export const deleteMiasm = async (req, res) => {
    try {
        const { id, idx } = req.params;
        const miasmData = await MiasmPatient.findOne({ patient: id });
        if (idx !== -1) {
            miasmData.diseases.splice(idx, 1);
            await miasmData.save();
        }
        res.json({
            success: true,
            message: "Deleted Successfully"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const getMiasmPatient = async (req, res) => {
    try {
        const { id } = req.params;
        const MiasmData = await MiasmPatient.find({ patient: id });
        res.json({
            success: true,
            MiasmData
        })
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const addMentalCausativeScribble = async (req, res) => {
    try {
        const id = req.params.id;
        const image = req.body.savedImage;

        await MentalCausativeScribble.create({
            patient: id,
            image: image,
        })

        return res.json({
            success: true
        })

    } catch (error) {
        console.log("Error in mental causative scribble controller", error.message);
        return res.json({
            message: error.message
        });
    }
}

export const getMentalCausativeScribble = async (req, res) => {
    try {
        const { id } = req.params;
        const mentalCausativeData = await MentalCausativeScribble.find({ patient: id });
        if (!mentalCausativeData) {
            res.json({
                success: true,
                message: 'No Mental Causative'
            })
        }
        res.json({
            success: true,
            mentalCausativeData
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const addMentalPersonalityScribble = async (req, res) => {
    try {
        const id = req.params.id;
        const image = req.body.savedImage;
        await MentalPersonalityScribble.create({
            patient: id,
            image: image,
        })

        return res.json({
            success: true
        })

    } catch (error) {
        console.log("Error in mental personality scribble controller", error.message);
        return res.json({
            message: error.message
        });
    }
}

export const getMentalPersonalityScribble = async (req, res) => {
    try {
        const { id } = req.params;
        const mentalPersonalityData = await MentalPersonalityScribble.find({ patient: id });
        if (!mentalPersonalityData) {
            res.json({
                success: true,
                message: 'No Mental Personality'
            })
        }
        res.json({
            success: true,
            mentalPersonalityData
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const addChiefComplaintScribble = async (req, res) => {
    try {
        const id = req.params.id;
        const image = req.body.savedImage;

        await ChiefComplaintScribble.create({
            patient: id,
            image: image,
        })

        return res.json({
            success: true
        })

    } catch (error) {
        console.log("Error in chief complaint scribble controller", error.message);
        return res.json({
            message: error.message
        });
    }
}

export const getChiefComplaintScribble = async (req, res) => {
    try {
        const { id } = req.params;
        const chiefComplaint = await ChiefComplaintScribble.find({ patient: id });
        if (!chiefComplaint) {
            res.json({
                success: true,
                message: 'No Chief Complaints'
            })
        }
        res.json({
            success: true,
            chiefComplaint
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const addPersonalHistoryScribble = async (req, res) => {
    try {
        const id = req.params.id;
        const image = req.body.savedImage;

        await PersonalHistoryScribble.create({
            patient: id,
            image: image,
        })

        return res.json({
            success: true
        })

    } catch (error) {
        console.log("Error in personal history scribble controller", error.message);
        return res.json({
            message: error.message
        });
    }
}

export const getPersonalHistoryScribble = async (req, res) => {
    try {
        const { id } = req.params;
        const personalHistory = await PersonalHistoryScribble.find({ patient: id });
        if (!personalHistory) {
            res.json({
                success: true,
                message: 'No Personal History'
            })
        }
        res.json({
            success: true,
            personalHistory
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const addBriefMindSymptomScribble = async (req, res) => {
    try {
        const id = req.params.id;
        const image = req.body.savedImage;

        await BriefMindSymptomScribble.create({
            patient: id,
            image: image,
        })

        return res.json({
            success: true
        })

    } catch (error) {
        console.log("Error in brief mind symptom scribble controller", error.message);
        return res.json({
            message: error.message
        });
    }
}

export const getBriefMindSymptomScribble = async (req, res) => {
    try {
        const { id } = req.params;
        const briefMindSymptomData = await BriefMindSymptomScribble.find({ patient: id });
        if (!briefMindSymptomData) {
            res.json({
                success: true,
                message: 'No Brief Mind Symptom'
            })
        }
        res.json({
            success: true,
            briefMindSymptomData
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

//Price controllers

export const addConsultationCharges = async (req, res) => {
    try {
        const { type, price, date } = req.body;
        const { id } = req.params;
        let formattedDate;
        const updateDate = () => {
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            formattedDate = `${day}-${month}-${year}`;
        };
        updateDate();
        await ConsultationCharges.create({
            type,
            price,
            patient: id,
            date: formattedDate
        })
        res.json({
            success: true
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const getConsultationCharges = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await ConsultationCharges.find({ patient: id });
        res.json({
            success: true,
            response,
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const deleteConsultationCharges = async (req, res) => {
    try {
        const { id } = req.params;
        await ConsultationCharges.findByIdAndDelete(id);
        res.json({
            success: true,
            message: 'deleted successfully'
        })

    } catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    }
}

export const addConsultationPrice = async (req, res) => {
    try {
        const { price } = req.body;
        await consultationChargesPrice.create({
            price
        })
        res.json({
            success: true,
            message: "Added  Consultation Charge"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const getConsultationPrice = async (req, res) => {
    try {
        const prices = await consultationChargesPrice.find().sort({ price: 1 });
        res.json({
            prices,
            success: true
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

//payment

export const getPayments = async (req, res) => {
    try {
        const paymentData = await fees.find();
        res.json({
            paymentData,
            success: true
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const updatePayment = async (req, res) => {
    try {
        const { newCase, sevenDays, fifteenDays, twentyOneDays, thirtyDays, fortyFiveDays, twoMonths, threeMonths, Courier } = req.body;
        const filter = {};
        const updatedPayment = await fees.findOneAndUpdate(
            filter,
            { $set: { newCase, sevenDays, fifteenDays, twentyOneDays, thirtyDays, fortyFiveDays, twoMonths, threeMonths, Courier } },
            { upsert: true, new: true }
        );
        res.json({
            success: true,
            message: "Edited Payment Successfully"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const getBill = async (req, res) => {
    try {
        const { id } = req.params;
        let formattedDate;
        const updateDate = () => {
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            formattedDate = `${day}-${month}-${year}`;
        };
        updateDate();
        let medicineCharges = 0;
        let consultation = 0;
        let newCaseCharge = 0;
        let onlineAmount = 0;
        const prescription = await Prescription.find({ patient: id, prescription_date: formattedDate });
        const Fees = await fees.findOne();
        const appointment = await Appointment.findOne({ PatientCase: id, date: formattedDate });
        const consultationCharges = (await ConsultationCharges.find({ patient: id, date: formattedDate }));
        const otherMedicine = await OtherPrescription.find({ patient: id, date: formattedDate });
        let otherPrescriptionPrice = 0;
        if (otherMedicine.length > 0) {
            otherMedicine.map((medicine, index) => otherPrescriptionPrice += medicine.price)
        }
        if (consultationCharges.length > 0) {
            consultation += parseInt(consultationCharges[0]?.price);
        }

        if (appointment.new_appointment_flag === true) {
            newCaseCharge += Fees?.newCase;
        }
        if (appointment.appointmentType === 'courier' && appointment.new_appointment_flag === true) {
            onlineAmount += Fees?.Courier;
        }
        let duration = Number(prescription[0]?.duration);
        prescription.map((pres, _) => {
            if (Number(pres?.duration) > duration) {
                duration = Number(pres?.duration);
            }
        });
        if (prescription) {
            if (duration === 7) {
                medicineCharges += Fees?.sevenDays
            }
            else if (duration === 15) {
                medicineCharges += Fees?.fifteenDays
            }
            else if (duration === 21) {
                medicineCharges += Fees?.twentyOneDays
            }
            else if (duration === 30) {
                medicineCharges += Fees?.thirtyDays
            }
            else if (duration === 45) {
                medicineCharges += Fees?.fortyFiveDays
            }
            else if (duration === 60) {
                medicineCharges += Fees?.twoMonths
            }
            else if (duration === 90) {
                medicineCharges += Fees?.threeMonths
            }
        }

        res.json({
            medicineCharges,
            newCaseCharge,
            consultation,
            otherPrescriptionPrice,
            onlineAmount,
            success: true
        })
    } catch (error) {
        res.json({
            message: error.message,
            success: false
        })
    }
}

export const addPayment = async (req, res) => {
    try {
        const { billPaid, modeOfPayment, appointmentType, paymentCollectedBy, transactionDetails, totalBill, balance_paid_flag, shift } = req.body;
       
        const { id } = req.params;
        let formattedDate;
        const updateDate = () => {
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear()
            formattedDate = `${day}-${month}-${year}`;
        };
        updateDate();

        const newBalance = totalBill - billPaid;
        const payment = await billPayment.updateOne(
            { patient: id },
            { $set: { dueBalance: newBalance, date: formattedDate, transactionDetails, billPaid, totalBill, modeOfPayment, appointmentType, paymentCollectedBy, balance_paid_flag, shift } },
            { upsert: true }
        );

        res.json({
            success: true,
            message: "Bill Payment Done",
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const sendAppointmentEmail = async (req, res) => {
    try {
        const { id } = req.params;
        await sendAppointmentPatientEmail(req.body.email, req.body, req.body.appointment, req.body.appointment.Doctor.fullname);
        return res.json({
            success: true,
            message: "Sent the Email"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const getBalanceDue = async (req, res) => {

    try {
        const { id } = req.params;
        const balance = await billPayment.findOne({ patient: id });

        if (!balance) {
            return res.json({
                message: 'No Balance Field',
                success: true
            })
        }
        res.json({
            balance,
            success: true
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const getPaymentBill = async (req, res) => {
    try {
        const { id } = req.params;
        let formattedDate;
        const updateDate = () => {
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            formattedDate = `${day}-${month}-${year}`;
        };
        updateDate();
        const response = await billPayment.findOne({ patient: id, date: formattedDate });
        res.json({
            response
        })
    } catch (error) {
        res.json({
            error: error.message,
            success: false
        })
    }
}


//stock

const updateStockApproval = async (id, flags) => {
    try {
        const { docApproval_flag, approval_flag_new, approval_flag_issue, approval_flag_receive } = flags;
        const updated = {};
        if (docApproval_flag !== undefined) {
            updated.docApproval_flag = docApproval_flag;
        }
        if (approval_flag_new !== undefined) {
            updated.approval_flag_new = approval_flag_new;
        }
        if (approval_flag_issue !== undefined) {
            updated.approval_flag_issue = approval_flag_issue;
        }
        if (approval_flag_receive !== undefined) {
            updated.approval_flag_receive = approval_flag_receive;
        }
        return await ItemStock.findByIdAndUpdate(id,
            updated
        )
    } catch (error) {
        console.log(error.message);
    }
}

export const approveStock = async (req, res) => {
    try {
        const stock = await updateStockApproval(req.params.id, req.body);
        res.json({
            message: 'Approved by Doctor',
            success: true
        })
    } catch (error) {
        res.json({
            message: error.message,
            success: false
        })
    }
}

export const approveAllStock = async (req, res) => {
    try {
        const items = await ItemStock.find();
        await Promise.all(items.map(async (item, _) => {
            await updateStockApproval(item?.id, req.body);
        }));
        return res
            .status(200)
            .json({
                success: true,
                message: "Approved All",
            });
    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: error.message
            });
    }
}

export const getBillNumber = async (req, res) => {
    try {
        const { ids } = req.query;
        let orders = [];
        await Promise.all(ids.map(async (id, _) => {
            const order = await Order.findById(id);
            orders.push(order.billNumber);
        }));

        return res.json({
            success: true,
            message: 'fetched details successfully',
            orders
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const getMedicalBillNumber = async (req, res) => {
    try {
        const { ids } = req.query;
        let orders = [];
        await Promise.all(ids.map(async (id, _) => {
            const order = await medicalOrder.findById(id);
            orders.push(order.billNumber);
        }));

        return res.json({
            success: true,
            message: 'fetched details successfully',
            orders
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

const updateMedicalStockApproval = async (id, flags) => {
    try {

        const { docApproval_flag, approval_flag_new, approval_flag_issue, approval_flag_receive } = flags;
        const updated = {};
        if (docApproval_flag !== undefined) {
            updated.docApproval_flag = docApproval_flag;
        }
        if (approval_flag_new !== undefined) {
            updated.approval_flag_new = approval_flag_new;
        }
        if (approval_flag_issue !== undefined) {
            updated.approval_flag_issue = approval_flag_issue;
        }
        if (approval_flag_receive !== undefined) {
            updated.approval_flag_receive = approval_flag_receive;
        }
        return await MedicalStock.findByIdAndUpdate(id,
            updated
        )
    } catch (error) {
        console.log(error.message);
    }
}

export const approveMedicalStock = async (req, res) => {
    try {
        const stock = await updateMedicalStockApproval(req.params.id, req.body);
        res.json({
            message: 'Approved by Doctor',
            success: true
        })
    } catch (error) {
        res.json({
            message: error.message,
            success: false
        })
    }
}

export const approveAllMedicalStock = async (req, res) => {
    try {
        const medicines = await MedicalStock.find();
        await Promise.all(medicines.map(async (medicine, _) => {
            await updateMedicalStockApproval(medicine?.id, req.body);
        }));
        return res
            .status(200)
            .json({
                success: true,
                message: "Approved All",
            });
    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: error.message
            });
    }
}

//orderPaymentDetails

export const addOrderPaymentDetails = async (req, res) => {
    try {
        const { transactionDetails, chequeNo, date, billNo, bills, totalBill, amountPaid, modeOfPayment, branch, phone } = req.body;
        
        const dateConverter = (date) => {
            const [y, m, d] = date.split('-');
            const newDate = String(d + '-' + m + '-' + y);
            return newDate;
        }
        const paymentDetails = await OrderPaymentDetails.create({
            order: billNo,
            transactionDetails,
            chequeNo,
            date:dateConverter(date),
            totalBill,
            bills,
            amountPaid,
            modeOfPayment,
            details_added_flag: true
        });
        await Promise.all(billNo.map(async (bill, _) => {
            const order = await Order.findById(bill);
            if (order) {
                order.order_payment_flag = true;
            }
            await order.save();
            const vendors = order?.formRows.map((row, _) => {
                return row?.vendor[0];
            });
            const emailedVendors = new Set();
            for (const vendor of vendors) {
                if (!emailedVendors.has(vendor)) {
                    const vendorPerson = await ItemVendor.findOne({ vendorname: vendor });
                    if (vendorPerson?.email) {
                        await sendPaymentEmail(vendorPerson?.email, req.body,branch, phone);
                        emailedVendors.add(vendor);
                    }
                }
            }
        }))

        return res
            .status(200)
            .json({
                success: true,
                message: 'Added Payment Details'
            });
    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: error.message
            });
    }
}

export const getOrderPaymentDetails = async (req, res) => {
    try {
        const { type } = req.params;
        let details;
        if (type === 'item') {
            details = await OrderPaymentDetails.find().populate('order');
        }
        else if (type === 'medicine') {
            details = await OrderMedicalPaymentDetails.find().populate('order');
        }
        return res
            .status(200)
            .json({
                success: true,
                message: "Fetched details successfully",
                details
            });
    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: error.message
            });
    }
}

export const addMedicalOrderPaymentDetails = async (req, res) => {
    try {

        const { transactionDetails, chequeNo, date, billNo, bills, totalBill, amountPaid, modeOfPayment, branch, phone } = req.body;
        const dateConverter = (date) => {
            const [y, m, d] = date.split('-');
            const newDate = String(d + '-' + m + '-' + y);
            return newDate;
        }
        
        const paymentDetails = await OrderMedicalPaymentDetails.create({
                order: billNo,
                transactionDetails,
                chequeNo,
                date:dateConverter(date),
                totalBill,
                bills,
                amountPaid,
                modeOfPayment,
                details_added_flag: true
            })
        await Promise.all(billNo.map(async (bill, _) => {
            
            const order = await medicalOrder.findById(bill);
            if (order) {
                order.order_payment_flag = true;
            }
            await order.save();
            const vendors = order?.formRows.map((row, _) => {
                return row?.vendor[0];
            });
            const emailedVendors = new Set();
            for (const vendor of vendors) {
                if (!emailedVendors.has(vendor)) {
                    const vendorPerson = await MedicalVendor.findOne({ vendorname: vendor });
                    if (vendorPerson?.email) {
                        await sendPaymentEmail(vendorPerson?.email, req.body,branch,phone);
                        emailedVendors.add(vendor);
                    }
                }
            }
        }))

        return res
            .status(200)
            .json({
                success: true,
                message: 'Added Payment Details'
            });
    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: error.message
            });
    }
}

//bill-invoice

export const addBillInvoice = async (req, res) => {
    try {
        let { title, patient, selectedDiagnosis, medicineName, startDate, endDate, consultingFee, medicineFee } = req.body;
        let formattedDate = '';

        const updateDate = () => {
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            formattedDate = `${day}-${month}-${year}`;
        };
        updateDate();
        const convertDateFormat = (dateString) => {
            const [year, month, date] = dateString.split('-');
            return `${parseInt(date)}-${parseInt(month)}-${parseInt(year)}`;
        };
        startDate = convertDateFormat(startDate);
        endDate = convertDateFormat(endDate);
        const invoices = await BillInvoice.find();
        const lastInvoice = invoices[invoices.length - 1];
        let billNumber = "001";
        if (lastInvoice && lastInvoice.billNumber) {
            let lastNum = parseInt(lastInvoice.billNumber, 10);
            let nextNum = lastNum + 1;
            if (nextNum > 999) nextNum = 1;
            billNumber = nextNum.toString().padStart(3, "0");
        }
        const invoice = await BillInvoice.create({
            title, patient, selectedDiagnosis, medicineName, startDate, endDate, consultingFee, medicineFee, date: formattedDate, billNumber
        });
        res.json({
            success: true,
            message: "Invoice created",
            invoice
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const getBillInvoice = async (req, res) => {
    try {
        const billInvoices = await BillInvoice.find().populate('patient');
        res.json({
            billInvoices,
            success: true
        })
    } catch (error) {
        res.json({
            success: true,
            message: error.message
        })
    }
}

//certificates

export const addCertificateDetails = async (req, res) => {
    try {
        let { selectedPatient, doctor, diagnoseOne, diagnoseTwo, diagnoseThree, date, restFrom, restTill, resumeDate, duration } = req.body;

        const convertDateFormat = (dateString) => {
            const [year, month, date] = dateString.split('-');
            return `${parseInt(date)}-${parseInt(month)}-${parseInt(year)}`;
        };
        date = convertDateFormat(date);
        restFrom = convertDateFormat(restFrom);
        restTill = convertDateFormat(restTill);
        resumeDate = convertDateFormat(resumeDate);
        if (!doctor) doctor = undefined;
        await Certificate.create({
            patient: selectedPatient, doctor, diagnoseOne, diagnoseTwo, diagnoseThree, date, restFrom, restTill, resumeDate, duration
        })
        res.json({
            success: true,
            message: "certificate added"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const getCertificates = async (req, res) => {
    try {
        const certificates = await Certificate.find().populate('patient').populate('doctor');
        res.json({
            certificates,
            success: true
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const editCertificate = async (req, res) => {
    try {
        let { diagnoseOne, diagnoseTwo, diagnoseThree, date, restFrom, restTill, resumeDate, duration } = req.body;
        const { id } = req.params;
        const convertDateFormat = (dateString) => {
            const [year, month, date] = dateString.split('-');
            return `${parseInt(date)}-${parseInt(month)}-${parseInt(year)}`;
        };
        date = convertDateFormat(date);
        restFrom = convertDateFormat(restFrom);
        restTill = convertDateFormat(restTill);
        resumeDate = convertDateFormat(resumeDate);
        const certificate = await Certificate.findByIdAndUpdate(id,
            { diagnoseOne, diagnoseTwo, diagnoseThree, date, restFrom, restTill, resumeDate, duration }
        );
        res.json({
            message: "Updated Successfully",
            success: true
        })
    } catch (error) {
        res.json({
            message: error.message,
            success: false
        })
    }
}

export const addRelation = async (req, res) => {
    try {
        const { relation } = req.body;
        const customRelation = await Relation.create({ relation });
        return res.json({
            message: "custom relation added",
            success: true
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
}

export const getRelations = async (req, res) => {
    try {
        const relations = (await Relation.find()).map((relation, _) => {
            return relation?.relation
        });
        return res.json({
            success: true,
            relations
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
}

export const addClinicDetails = async (req, res) => {
    try {
        const { branch, phone, email, shift } = req.body;
        const branchExists = await Clinic.findOne({ branch });
        if (branchExists) {
            if (phone) {
                branchExists?.phone.push(phone);
                await branchExists.save();
            }
            if (shift) {
                branchExists?.shifts.push(shift);
                await branchExists.save();
            }
            if (email) {
                await Clinic.updateOne(
                    { branch: branch },
                    { $set: { email: email } }
                );
            }
        }
        else {
            let phoneArray = [];
            let shifts = [];
            shifts.push(shift);
            phoneArray.push(phone);
            await Clinic.create({ branch, phone: phoneArray, email, shifts });
        }
        return res.json({
            success: true,
            message: "Clinic Details added"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const getClinicDetails = async (req, res) => {
    try {
        const details = await Clinic.find();
        return res.json({
            success: true,
            details
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const deleteClinicDetail = async (req, res) => {
    try {
        const { id } = req.params;
        await Clinic.findByIdAndDelete(id);
        return res.json({
            success: true,
            message: "Deleted Successfully"
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const deletePhoneNumber = async (req, res) => {
    try {
        const { index, id } = req.params;
        let detail = await Clinic.findById(id);
        detail.phone = detail?.phone?.filter((phone, idx) => idx != index);
        await detail.save();
        return res.json({
            success: true,
            message: 'Deleted a phone number'
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const deleteClinicEmail = async (req, res) => {
    try {
        const { id } = req.params;
        const detail = await Clinic.findById(id);
        detail.email = '';
        await detail.save();
        return res.json({
            success: true,
            message:'deleted clinic email'
        })
    } catch (error) {
         return res.json({
            success: false,
            message: error.message
        })
    }
}

export const deleteShift = async (req, res) => {
    try {
        const { shiftIndex, id } = req.params;
        let branch = await Clinic.findById(id);
        branch.shifts = branch?.shifts?.filter((item, index) => index !== Number(shiftIndex));
        
        await branch.save();
         return res.json({
            success: true,
            message: 'Deleted a shift'
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const getShifts = async (req, res) => {
    try {
        const { branch } = req.params;
        const shifts = await Clinic.findOne({ branch });
        return res.json({
            success: true,
            shifts:shifts.shifts
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const selectBranch = async (req, res) => {
    try {
        const { id } = req.params;
        await Clinic.updateMany({}, { selectedBranch: false });
        const branchUpdate = await Clinic.findByIdAndUpdate(id, {
            selectedBranch: true
        });
        return res.json({
            success: true,
            message: 'Selected Branch'
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
}