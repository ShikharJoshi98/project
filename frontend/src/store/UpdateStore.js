import axios  from "axios";
import { create } from "zustand";


const HR_API_URL = 'http://localhost:4000/api/hr';
axios.defaults.withCredentials = true;

export const useStore = create((set) => ({
  docusers: [],
  receptionistusers: [],
  getDoctorDetails: async () => {
    try {
       
       const  response = await axios.get(`${HR_API_URL}/get-details-doctor`);
          
      
        
        set({ docusers: response.data.detail });
    } catch (error) {
      console.log(error.message);
    }
  },
  getReceptionistDetails: async () => {
    try {     
       
      const  response = await axios.get(`${HR_API_URL}/get-details-receptionist`);
      
        console.log(response.data.detail);
        set({ receptionistusers: response.data.detail });
    } catch (error) {
      console.log(error.message);
    }
  },
  updateDoctor: async (id, updatedData) => {
    console.log("hello")
    try {
      const response = await axios.put(`${HR_API_URL}/update-doctor/${id}`, updatedData);
      set((state) => ({
        docusers: state.docusers.map((user) =>
          user._id === id ? response.data : user
        ),
      }));
      return response.data;
    } catch (error) {
      console.error("Error updating doctor:", error);
      throw error;
    }
  },
  updateReceptionist: async (id, updatedData) => {
    try {
      const response = await axios.put(`${HR_API_URL}/update-receptionist/${id}`, updatedData);
      set((state) => ({
        receptionistusers: state.receptionistusers.map((user) =>
          user._id === id ? response.data : user
        ),
      }));
      return response.data;
    } catch (error) {
      console.error("Error updating receptionist:", error);
      throw error;
    }
  }
}));