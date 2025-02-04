import { create } from "zustand";
import axios from "axios";


const API_URL = 'http://localhost:4000/api/auth';
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) =>( {
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    register: async (fullname, phone, Altphone, email, username, password, branch) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/register`, { fullname, phone, Altphone, email, username, password, branch });
            set({ User: response.data.User, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.message || "Error signing up", isLoading: false });
            throw error;
        }
    },
    login: async ( username, password, role) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/login`, {  username, password, role });
            set({ user: response.data.User, isAuthenticated: true,error:null, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.message || "Error Logging in", isLoading: false });
            throw error;
        }
    },
    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });

        } catch (error) {
            set({ error: null, isCheckingAuth: false, isAuthenticated: false });
        }

    }


}))