import axios  from "axios";
import { create } from "zustand";

const DOC_API_URL = "http://localhost:4000/api/doctor";
axios.defaults.withCredentials = true;

export const docStore = create((set) => ({
    tasks: [],
    getTasks: async (username) => {
        try {
            const response = await axios.get(`${DOC_API_URL}/task-details/${username}`);
            set({
                tasks:response.data.tasks
            })
        } catch (error) {
            console.log(error.message);
        }
    },
    updateTaskStatus: async (id) => {
        try {
             const response = await axios.put(`${DOC_API_URL}/update-task-status`,{id});
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
    }
}))
