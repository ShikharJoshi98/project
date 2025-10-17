import { Appointment } from "../models/AppointmentModel.js";
import Patient, { Prescription } from "../models/PatientModel.js";

export const getPatientAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointments = await Appointment.find({ PatientCase: id }).populate('PatientCase').populate('Doctor');
        const prescription = await Prescription.find({ patient: id }).populate('patient');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const parseDate = (dateStr) => {
            const [day, month, year] = dateStr.split('-');
            return new Date(year, month - 1, day);
        };
        const lastTwoAppointment = appointments.slice(0, 2).filter((appointment) => {
            const appointmentDate = parseDate(appointment.date);
            appointmentDate.setHours(0, 0, 0, 0);
            return (
                appointmentDate <= today && appointment?.followUp_appointment_flag === true
            );
        });

        const nextAppointment = prescription.filter((appointment) => {
            const appointmentDate = parseDate(appointment?.prescription_date);
            appointmentDate.setHours(0, 0, 0, 0);

            return (
                appointment?.medicine_issued_flag === true &&
                appointmentDate >= today
            );
        });

        res.json({
            lastTwoAppointment,
            nextAppointment,
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