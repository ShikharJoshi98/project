import axios  from "axios";
import { create } from "zustand";

export const DOC_API_URL = "http://localhost:4000/api/doctor";
axios.defaults.withCredentials = true;

export const docStore = create((set,get) => ({
    tasks: [],
    task: null,
    leaves: [],
    appointments:[],
    Homeo: [],
    appointment: null,
    caseImages: [],
    diagnosisImages:[],
    section: "medicine",
    setsection: (newsection) => set({ section: newsection }),
    branch: "",
    setbranch: (newbranch)=> set({branch:newbranch}),
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
    
          if (response.status !== 200) throw new Error("Failed to submit appointment");
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
    },
    uploadCase: async (formData, id) => {
        try {
            const response = await axios.post(`${DOC_API_URL}/upload-case-image/${id}`, formData, {
                headers:{"Content-Type":"multipart/form-data"}
            })
            set((state) => ({
                caseImages: [...state.caseImages, response.data.patient.caseImages.imageUrl]
            }));
        } catch (error) {
            console.log(error.message);   
        }
    },
    getCaseImages: async (id) => {
        try {
            const response = await axios.get(`${DOC_API_URL}/case-images/${id}`)
            set({ caseImages: response.data.caseImages });
        } catch (error) {
            console.log(error.message);   
        }
    },
    getDiagnosisImages: async (id) => {
        try {
            const response = await axios.get(`${DOC_API_URL}/diagnosis-images/${id}`)
            set({ diagnosisImages: response.data.diagnosisImages });
        } catch (error) {
            console.log(error.message);   
        }
    },
    deleteHomeo: async ( id) => {
        try {
            const response = await axios.delete(`${DOC_API_URL}/homeo-delete/${id}`)
            
        } catch (error) {
            console.log(error.message);   
        }
    },
    getAppdetails: async (appointmentType) => {
        try {
            // console.log(appointmentType);
            const response = await axios.get(`${DOC_API_URL}/get-patient-details/${appointmentType}`);
            set({appointments:response.data})
        } catch (error) {
            console.log(error);
        }
    },
    deleteCaseImage: async (patientId, imageId)=>{
        let response = await axios.delete(`${DOC_API_URL}/patient/${patientId}/case-images/${imageId}`);

    }
    
}))
