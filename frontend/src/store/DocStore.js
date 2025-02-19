import axios  from "axios";
import { create } from "zustand";

const DOC_API_URL = "http://localhost:4000/api/doctor";
axios.defaults.withCredentials = true;

export const docStore = create((set) => ({
    tasks: [],
    task: null,
    leaves: [],
    Homeo: [],
    appointment: null,
    section: "medicine",
    setsection: (newsection)=> set({section:newsection}),
    getTasks: async () => {
        try {
            const response = await axios.get(`${DOC_API_URL}/task-details`);
            set({
                tasks: response.data.tasks
            })
        } catch (error) {
            console.log(error.message);
        }
    },
    DeleteTask: async (id) => {
        try {
            await axios.delete(`${DOC_API_URL}/delete-task/${id}`);
             
        } catch (error) {
            console.log(error.message);
        }
    },
    addTask: async (task, username) => {
        try {
            const response = await axios.post(`${DOC_API_URL}/new-task`, { task, username });
            console.log(response.data.newTask);
            set({ task: response.data.newTask })
        } catch (error) {
            console.log(error.message);
        }
    },
    updateTaskStatus: async (id) => {
        try {
            const response = await axios.put(`${DOC_API_URL}/update-task-status`, { id });
            if (response.data.task) {
                set((state) => ({
                    tasks: state.tasks.map((task) =>
                        task._id === id ? response.data.task : task
                    ),
                }));
            } else {
                console.error("Failed to update task:", response.data.error);
            }
    
            return response.data.task;

        } catch (error) {
            console.log(error.message);
        }
    },
    LeaveDetails: async ()=>{
        try {
            const response = await axios.get(`${DOC_API_URL}/leave-details`);
            set({leaves:response.data.leaves})
        } catch (error) {
            console.log(error.message);
        }
    },
    updateLeave: async (id,status)=>{
        try {
            const response = await axios.put(`${DOC_API_URL}/leave-status/${id}`,{status});
            set((state) => ({
                leaves: state.leaves.map((leave) =>
                    leave._id === id ? response.data.updatedleave : leave
                ),
            }));
        } catch (error) {
            console.log(error.message);
        }
    },
    submitAppointment: async (data) => {
        try {
          const response = await axios.post(`${DOC_API_URL}/appointment-doctor`, data);
    
          if (response.status !== 201) throw new Error("Failed to submit appointment");
          set({ appointment: response.data.newAppointment });

        } catch (error) {
          console.error("Error:", error.response?.data || error.message);
        }
    },
    homeobhagwat: async (data) => {
        try {
            await axios.post(`${DOC_API_URL}/homeo-book`, data);
    
        } catch (error) {
            console.log(error.message);

        }
    },
    gethomeobhagwat: async () => {
        try {
            let response = await axios.get(`${DOC_API_URL}/get-homeo-book`);
            set({Homeo:response.data.Info})
        } catch (error) {
            console.log(error.message);

        }
    },
    updatehomeobhagwat: async (id,data) => {
        try {
            let response = await axios.put(`${DOC_API_URL}/update-homeo-book/${id}`,data);
            set((state) => ({
                Homeo: state.Homeo.map((item) =>
                    item._id === id ? response.data.UpdatedInfo : item
                ),
            }));
        } catch (error) {
            console.log(error.message);

        }
    }
    
}))
