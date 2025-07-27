import axios from "axios";
import { create } from "zustand";
import { HR_API_URL } from "./UpdateStore";

export const DOC_API_URL = `${import.meta.env.VITE_API_URL}/api/doctor`;
axios.defaults.withCredentials = true;

export const docStore = create((set) => ({
    tasks: [],
    task: null,
    leaves: [],
    userLeaves: [],
    domGeneral: null,
    mulGeneral: null,
    domRepeat: null,
    mulRepeat: null,
    domCourier: null,
    mulCourier: null,
    newAppointmentLength: null,
    followUpAppointmentLength: null,
    medicineIssuedLength: null,
    medicineNotIssuedLength: null,
    appointments: [],//
    Homeo: [],
    appointment: null,
    caseImages: [],
    prescription: [],
    diagnosisImages: [],
    historyDetails:[],
    allPrescriptions: [],
    list: [],
    payment: [],
    PresentComplaintData: [],    
    briefMindSymptomScribble: [],
    PastHistoryData: [],
    FamilyMedicalData: [],
    MentalCausativeData: [],
    MentalPersonalityData: [],
    mentalCausativeScribble: [],
    mentalPersonalityScribble: [],
    ThermalReactionData: [],
    MiasmData: [],
    otherPrescriptions: [],
    consultationCharges: [],
    investigationAdvised: [],
    testInfo: [],
    prescriptionsArray:[],
    chiefComplaints: [],
    personalHistory: [],
    section: "medicine",
    prescriptionSubmit: false,
    appointmentSubmit: false,
    billInfo: [],
    totalBill: [],
    balanceDue: [],
    billInvoices: [],
    certificates:[],
    appointmentSection: "general",
    homeoBhagwatSection: "medicine",
    orderId: [],
    medicalOrderId:[],
    setHomeoBhagwatSection: (newsection) => set({ homeoBhagwatSection: newsection }),
    setAppointmentSection: (newsection) => set({ appointmentSection: newsection }),
    setsection: (newsection) => set({ section: newsection }),
    togglePrescriptionSubmit: () => set((state) => ({ prescriptionSubmit: !state.prescriptionSubmit })),
    toggleAppointmentSubmit: (appointment) => set({ appointmentSubmit: appointment }),
    addTaskToggle: false,
    toggleTaskSubmit: () => set((state) => ({ addTaskToggle: !state.addTaskToggle })),
    branch: "",
    setbranch: (newbranch) => set({ branch: newbranch }),
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
    LeaveDetails: async (id) => {
        try {
            const response = await axios.get(`${DOC_API_URL}/leave-details/${id}`);
            set({ leaves: response.data.leaves });
            set({ userLeaves: response.data.userLeaves });
        } catch (error) {
            console.log(error.message);
        }
    },
    updateLeave: async (id, status) => {
        try {
            const response = await axios.put(`${DOC_API_URL}/leave-status/${id}`, { status });
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
            set({ Homeo: response.data.Info })
        } catch (error) {
            console.log(error.message);

        }
    },
    updatehomeobhagwat: async (id, data) => {
        try {
            let response = await axios.put(`${DOC_API_URL}/update-homeo-book/${id}`, data);
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
                headers: { "Content-Type": "multipart/form-data" }
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
    getAppointmentCount: async () => {
        try {
            const response = await axios.get(`${DOC_API_URL}/get-incomplete-appointments`);
            set({ domGeneral: response.data.domGeneral })
            set({ mulGeneral: response.data.mulGeneral });
            set({ domRepeat: response.data.domRepeat });
            set({ mulRepeat: response.data.mulRepeat });
            set({ domCourier: response.data.domCourier });
            set({ mulCourier: response.data.mulCourier });
        } catch (error) {
            console.log(error.message);
        }
    }, 
    getAppDetails: async (appointmentSection,branch,user) => {//
      try {
          const response = await axios.get(`${DOC_API_URL}/getAppointments/${branch}/${appointmentSection}/${user}`);
          set({ appointments: response.data.Appointments });
          set({ newAppointmentLength: response.data.newAppointmentLength });
          set({ followUpAppointmentLength: response.data.followUpAppointmentLength });
          set({ medicineIssuedLength: response.data.medicineIssuedLength });
          set({ medicineNotIssuedLength: response.data.medicineNotIssuedLength });
      } catch (error) {
          console.error(error.message);
      }  
    },
    deleteCaseImage: async (patientId, imageId) => {
        let response = await axios.delete(`${DOC_API_URL}/patient/${patientId}/case-images/${imageId}`);
    },
    fetchPrescription: async (id) => {
        const response = await axios.get(`${DOC_API_URL}/get-today-prescription/${id}`);
        set({ prescription: response.data.presToday })

    },
    getPastPrescription: async (id) => {
        const response = await axios.get(`${DOC_API_URL}/get-all-prescription/${id}`);
        set({ allPrescriptions: response.data.presToday });
    },
    getHistoryDetails: async (id) => {
        const response = await axios.get(`${DOC_API_URL}/getHistoryDetails/${id}`);
        set({historyDetails:response.data.combinedArray})
    },
    getPresentComplaint: async (id) => {
        const response = await axios.get(`${DOC_API_URL}/getPresentComplaint/${id}`);
        set({PresentComplaintData:response.data.combinedArray})
    },
    getCaseData: async (complaint) => {
        const response = await axios.get(`${DOC_API_URL}/CaseMaster/${complaint.replace(/\s+/g, "")}`);
        set({
            list: response.data.caseData.sort((a, b) =>
                a.name.toLowerCase().localeCompare(b.name.toLowerCase())
            )
        });
    },
    getPresentComplaintData: async (id) => {
        const response = await axios.get(`${DOC_API_URL}/presentComplaints/${id}`);
        set({ PresentComplaintData: response.data.presentComplaintData });
    },
    getPastHistoryData: async (id) => {
        const response = await axios.get(`${DOC_API_URL}/pastHistory/${id}`);
        set({ PastHistoryData: response.data.pastData });
    },
    getFamilyMedicalData: async (id) => {
        const response = await axios.get(`${DOC_API_URL}/familyMedical/${id}`);
        set({ FamilyMedicalData: response.data.familyData });
    },
    getMentalCausative: async (id) => {
        const response = await axios.get(`${DOC_API_URL}/mentalCausative/${id}`);
        set({ MentalCausativeData: response.data.mentalCausativeData });
    },
    getMentalPersonality: async (id) => {
        const response = await axios.get(`${DOC_API_URL}/mentalPersonality/${id}`);
        set({ MentalPersonalityData: response.data.mentalPersonalityData });
    },
    getThermalReaction: async (id) => {
        const response = await axios.get(`${DOC_API_URL}/thermalReaction/${id}`);
        set({ ThermalReactionData: response.data.thermalReactionData });
    },
    getMiasm: async (id) => {
        const response = await axios.get(`${DOC_API_URL}/miasmPatient/${id}`);
        set({ MiasmData: response.data.MiasmData });
    },
    getOtherPrescription: async (id) => {
        const response = await axios.get(`${DOC_API_URL}/get-other-prescription/${id}`);
        set({ otherPrescriptions: response.data.otherPrescription });
    },
    getConsultationCharges: async (id) => {
        const response = await axios.get(`${DOC_API_URL}/get-consultation-charges/${id}`);
        set({ consultationCharges: response.data.response });
    },
    getPresentComplaintScribble: async (id) => {
        const response = await axios.get(`${DOC_API_URL}/get-present-compaint-scribble/${id}`);
        set({ PresentComplaintScribble: response.data.presentComplaintScribble });
    },
    getPresentComplaintWriteUp: async (id) => {
        const response = await axios.get(`${DOC_API_URL}/get-present-compaint-writeup/${id}`);
        set({ PresentComplaintWriteUp: response.data.writeUpData });
    },
    getInvestigationAdvised: async (type) => {
        const response = await axios.get(`${DOC_API_URL}/getInvestigationAdvised/${type}`);
        set({ investigationAdvised: response.data.response });
    },
    getTestInfo: async (id, investigationType) => {
        const response = await axios.get(`${DOC_API_URL}/get-test/${id}/${investigationType}`);
        set({ testInfo: response.data.investigationInfo })
    },
    getChiefComplaints: async (id) => {
        const response = await axios.get(`${DOC_API_URL}/chiefComplaints/${id}`);
        set({ chiefComplaints: response.data.chiefComplaint })
    },
    getPersonalHistory: async (id) => {
        const response = await axios.get(`${DOC_API_URL}/personalHistroy/${id}`);
        set({ personalHistory: response.data.personalHistory })
    },
    getMentalCausativeScribble: async (id) => {
        const response = await axios.get(`${DOC_API_URL}/mentalCausativeScribble/${id}`);
        set({ mentalCausativeScribble: response.data.mentalCausativeData })
    },
    getMentalPersonalityScribble: async (id) => {
        const response = await axios.get(`${DOC_API_URL}/mentalPersonalityScribble/${id}`);
        set({ mentalPersonalityScribble: response.data.mentalPersonalityData })
    },
    getBriefMindSymptomScribble: async (id) => {
        const response = await axios.get(`${DOC_API_URL}/briefMindSymptomScribble/${id}`);
        set({ briefMindSymptomScribble: response.data.briefMindSymptomData })
    },
    getPayment: async () => {
        const response = await axios.get(`${DOC_API_URL}/getPayment`);
        set({ payment: response.data.paymentData })
    },
    getBillInfo: async (id) => {
        const response = await axios.get(`${DOC_API_URL}/getBillPayment/${id}`);
        set({ billInfo: response.data })
    },
    getTotalBill: async (id) => {
        const response = await axios.get(`${DOC_API_URL}/getTotalBillPayment/${id}`);
        set({ totalBill: response.data.response });
    },
    getBalanceDue: async (id) => {
        const response = await axios.get(`${DOC_API_URL}/getBalanceDue/${id}`);
        if (response.data.balance) {
            set({ balanceDue: response.data.balance });
        }
        else {
            set({ balanceDue: response.data.message });
        }
    },
    getPrescriptions: async () => {
        const response = await axios.get(`${DOC_API_URL}/getAllPrescripion`);
        set({ prescriptionsArray: response.data.allPrescriptions });
    },
    getBillInvoices: async () => {
        const response = await axios.get(`${DOC_API_URL}/getBillInvoices`);
        set({ billInvoices: response.data.billInvoices });
    },
    getCertificates: async () => {
        const response = await axios.get(`${DOC_API_URL}/getCertificates`);
        set({certificates:response.data.certificates})
    },
    getOrderId: async () => {
        const response = await axios.get(`${HR_API_URL}/getOrderId`);
        set({orderId: response.data.order})
    },
    getMedicalOrderId: async () => {
        const response = await axios.get(`${HR_API_URL}/getMedicalOrderId`);
        set({medicalOrderId: response.data.medicalOrder})
    }
}))