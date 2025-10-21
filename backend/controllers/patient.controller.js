import { Appointment } from "../models/AppointmentModel.js";
import Patient, { Prescription } from "../models/PatientModel.js";

export const getPatientAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointments = await Appointment.find({ PatientCase: id, visit_complete_flag:true }).populate('PatientCase').populate('Doctor');
        const prescription = await Prescription.find({ patient: id, medicine_issued_flag:true }).populate('patient');
        
        const lastTwoAppointment = appointments.slice(-2)
        const doctorNextAppointment = lastTwoAppointment[lastTwoAppointment.length - 1].Doctor.fullname;
        const nextAppointment = prescription.slice(-1);
        res.json({
            lastTwoAppointment,
            nextAppointment,
            doctorNextAppointment,
            success: true,
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        });
    }
};


export const updatePatientAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findByIdAndUpdate(id, {
            First_Appointment_Flag: false
        });
        return res.json({
            success: true,
            message: "Successfully updated the first case flag"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}