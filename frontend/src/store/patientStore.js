import axios from "axios";
import { create } from "zustand";

export const REC_API_URL = `${import.meta.env.VITE_API_URL}/api/patient`;
axios.defaults.withCredentials = true;

export const patientStore = create((set) => (
    {
        lastTwoAppointments: [],
        nextAppointment: [],
        getPatientAppointments: async (id) => {
            const response = await axios.get(`${REC_API_URL}/getAppointments/${id}`);
            set({ lastTwoAppointments: response.data.lastTwoAppointment });
            set({nextAppointment:response.data.nextAppointment})
        }
    }
))