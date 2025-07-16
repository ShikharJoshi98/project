import axios from "axios";
import { create } from "zustand";

export const REC_API_URL = `${import.meta.env.VITE_API_URL}/api/receptionist`;
axios.defaults.withCredentials = true;

export const recStore = create((set) => ({
    patients: [],//
    appointments:[],
    patient: null,
    patientLength: null,
    appointmentSection: "general",
    update: false,
    stockToggle: false,
    toggleStockUpdate: () => set((state) => ({ stockToggle: !state.stockToggle })),
    setUpdate: (updateStatus) => set({ update: updateStatus }),
    setAppointmentSection: (newsection) => set({ appointmentSection: newsection }),
    getPatientDetails: async (page,search) => {//
        try {
            const response = await axios.get(`${REC_API_URL}/get-patients`, {
                params: {
                    page: page,
                    search,search
                }
            });
            set({ patients: response.data.patients });
            set({ patientLength: response.data.patientLength });
        } catch (error) {
            console.error(error.message);
        }
    },
    getPatient: async (id) => {
        try {
            const response = await axios.get(`${REC_API_URL}/getPatient/${id}`);
            set({patient:response.data.patient})
        } catch (error) {
            console.log(error.message);
        }
    }
}))