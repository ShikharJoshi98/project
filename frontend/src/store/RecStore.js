import axios from "axios";
import { create } from "zustand";

export const REC_API_URL = `${import.meta.env.VITE_API_URL}/api/receptionist`;
axios.defaults.withCredentials = true;

export const recStore = create((set) => ({
    patients: [],//
    allPatients: [],
    appointments: [],
    allBranchPatients: [],//
    appointmentsLength:null,
    pendingAppointmentLength: null,
    completeAppointmentLength: null,
    patient: null,//
    generalAppointments: [],
    repeatAppointments: [],
    courierAppointments: [],
    doctor:null,
    patientLength: null,
    appointmentSection: "general",
    update: false,//
    stockToggle: false,
    toggleStockUpdate: () => set((state) => ({ stockToggle: !state.stockToggle })),
    setUpdate: () => set((state)=>({ update: !state.update })),
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
        } catch (error) {
            console.error(error.message);
        }
    },
    getAllPatients: async (branch) => {
        try {
            const response = await axios.get(`${REC_API_URL}/getAllPatients/${branch}`);
            set({ allPatients: response.data.patients });
            set({ allBranchPatients: response.data.allBranchPatients });
        } catch (error) {
            console.log(error.message);
        }
    },
    getPatient: async (id) => {//
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
            set({ generalAppointments: response.data.generalAppointments });
            set({ repeatAppointments: response.data.repeatAppointments });
            set({ courierAppointments: response.data.courierAppointments });
        } catch (error) {
            console.log(error.message);
        }
    },
    getAppointments: async (branch,appointmentType) => {
        try {
            const response = await axios.get(`${REC_API_URL}/getRecAppointments/${branch}/${appointmentType}`);
            set({ appointments: response.data.appointments });
        } catch (error) {
            console.log(error.message);
        }
    },
    getAppointmentLength: async (branch) => {
        try {
            const response = await axios.get(`${REC_API_URL}/getAppointmentsLength/${branch}`);
            set({ appointmentsLength: response.data.appointmentsLength });
            set({ pendingAppointmentLength: response.data.pendingAppointmentLength });
            set({ completeAppointmentLength: response.data.completeAppointmentLength });
        } catch (error) {
            console.log(error.message);
        }
    },
    getDoctor: async (id) => {
        try {
            const response = await axios.get(`${REC_API_URL}/getDoctor/${id}`);
            set({ doctor: response.data.doctor });
        } catch (error) {
            console.log(error.message);
        }
    }
}))