import { Appointment } from "../models/AppointmentModel.js";

export const getPatientAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointments = await Appointment.find({ PatientCase: id }).populate('PatientCase').populate('Doctor');
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

        const nextAppointment = appointments.filter((appointment) => {
            const appointmentDate = parseDate(appointment.date);
            appointmentDate.setHours(0, 0, 0, 0);

            return (
                appointment?.medicine_issued_flag === false &&
                appointment?.complete_appointment_flag === false &&
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
