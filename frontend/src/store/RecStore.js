import axios from "axios";
import { create } from "zustand";

const DOC_API_URL = `${import.meta.env.VITE_API_URL}/api/receptionist`;
axios.defaults.withCredentials = true;

export const recStore = create((set) => ({
    patients: [],
    appointmentSection: "General",
    setAppointmentSection: (newsection) => set({ appointmentSection: newsection }),
    getPatientDetails: async () => {
        try {
            const response = await axios.get(`${DOC_API_URL}/get-patients`);
            set({ patients: response.data.patients });
        } catch (error) {
            console.log(error.message);
        }
    }
}))