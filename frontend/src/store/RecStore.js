import axios from "axios";
import { create } from "zustand";

export const REC_API_URL = `${import.meta.env.VITE_API_URL}/api/receptionist`;
axios.defaults.withCredentials = true;

export const recStore = create((set) => ({
    patients: [],//
    allPatients:[],
    appointments: [],
    allBranchPatients:[],
    pendingAppointmentLength: null,
    completeAppointmentLength: null,
    patient: null,
    patientLength: null,
    appointmentSection: "general",
    update: false,
    stockToggle: false,
    toggleStockUpdate: () => set((state) => ({ stockToggle: !state.stockToggle })),
    setUpdate: (updateStatus) => set({ update: updateStatus }),
    setAppointmentSection: (newsection) => set({ appointmentSection: newsection }),
    getPatientDetails: async (page, search, branch) => {//
        try {
            const response = await axios.get(`${REC_API_URL}/get-patients/${branch}`, {
                params: {
                    page: page,
                    search, search
                }
            });
            set({ patients: response.data.patients });
            set({ patientLength: response.data.patientLength });
            set({ allBranchPatients: response.data.allBranchPatients });
        } catch (error) {
            console.error(error.message);
        }
    },
    getAllPatients: async () => {
      try {
          const response = await axios.get(`${REC_API_URL}/getAllPatients`);
          set({ allPatients: response.data.patients });
      } catch (error) {
          console.log(error.message);
      }  
    },
    getPatient: async (id) => {
        try {
            const response = await axios.get(`${REC_API_URL}/getPatient/${id}`);
            set({ patient: response.data.patient })
        } catch (error) {
            console.log(error.message);
        }
    },
    getAppointmentsRec: async (branch) => {
        try {
            const response = await axios.get(`${REC_API_URL}/getAppointments/${branch}`);
            set({ appointments: response.data.appointments });
            set({ completeAppointmentLength: response.data.completeAppointmentLength });
            set({ pendingAppointmentLength: response.data.pendingAppointmentLength });
        } catch (error) {
            console.log(error.message);
        }
    }
}))