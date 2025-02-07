import axios  from "axios";
import { create } from "zustand";


const HR_API_URL = 'http://localhost:4000/api/hr';
axios.defaults.withCredentials = true;

export const useStore = create((set) => ({
  users: [],
  getDetails: async () => {
    try {
        const response = await axios.get(`${HR_API_URL}/get-details`);
        console.log(response.data.detail);
        set({ users: response.data.detail });
    } catch (error) {
        
    }
  }
}));