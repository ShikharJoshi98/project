import axios from "axios";
import { create } from "zustand";


export const HR_API_URL = `${import.meta.env.VITE_API_URL}/api/hr`;
axios.defaults.withCredentials = true;

export const useStore = create((set) => ({
  employees: [],
  items: [],
  vendors: [],
  billImages: [],
  billImagesLength: 0,
  itemExistMessage:'',
  vendor: null,
  Item: null,
  stock: null,
  Unit: null,
  Tasks: [],
  units: [],
  order: [],
  Orders: null,
  orderBillAmount:null,
  medicines: [],
  Medicine: null,
  medicalitems: [],
  potencys: [],
  Potency: null,
  generalAppointments: [],
  repeatAppointments: [],
  courierAppointments: [],
  appointments:[],
  collection: [],
  branchCollection: [],
  courierPayment: [],
  branchCourierPayment: [],
  ordersPlaced: [],
  medicalOrders:[],
  medicalStock:[],
  medSection: "general",
  medicalStockToggle: false,
  stockExistsMessage: null,
  aadharCard: [],
  panCard: [],
  everyCollection:[],
  medicalStockToggleSubmit: () => set((state) => ({ medicalStockToggle: !state.medicalStockToggle })),
  setMedSection: (newsection) => set({ medSection: newsection }),
  getDetails: async () => {
    try {
      const response = await axios.get(`${HR_API_URL}/get-details`);
      set({ employees: response.data.detail })
    } catch (error) {
      console.log(error.message)
    }
  },
  update: async (id, updatedData) => {
    try {
      const response = await axios.put(`${HR_API_URL}/update/${id}`, updatedData);
      set((state) => ({
        employees: state.employees.map((user) =>
          user._id === id ? response.data : user
        ),
      }));
      return response.data;
    } catch (error) {
      console.error("Error updating doctor:", error);
      throw error;
    }
  },
  getDocuments: async (id) => {
    try {
      const response = await axios.get(`${HR_API_URL}/getEmployeeDocuments/${id}`);
      set({ aadharCard: response.data.aadharCard });
      set({ panCard: response.data.panCard });
    } catch (error) {
      console.log(error.message);
    }
  },
  getItems: async () => {
    try {
      const response = await axios.get(`${HR_API_URL}/get-items`);
      set({ items: response.data.items });
    } catch (error) {
      console.log(error.message);
    }
  },
  AddItem: async (newitem) => {
    try {
      const response = await axios.post(`${HR_API_URL}/add-item`, { item: newitem });
      set({ Item: response.data.newItem })
    } catch (error) {
      console.log(error.message);
    }
  },
  getAppointment: async (branch, shift="") => {
    try {
      const response = await axios.get(`${HR_API_URL}/getHrAppointments`, {
        params: {
          branch,
          shift
        }
      });
      set({ generalAppointments: response.data.generalAppointments });
      set({ repeatAppointments: response.data.repeatAppointments });
      set({ courierAppointments: response.data.courierAppointments });
    } catch (error) {
      console.log(error.message);
    }
  },
  getAppointmentDetails: async (branch, appointmentType, shift="") => {
    try {
      const response = await axios.get(`${HR_API_URL}/appDetails`, {
        params: {
          branch,
          appointmentType,
          shift
        }
      });
      set({appointments:response.data.appointments})
    } catch (error) {
      console.log(error.message);
    }
  },
  getUnits: async () => {
    try {
      const response = await axios.get(`${HR_API_URL}/get-units`);
      set({ units: response.data.units });
    } catch (error) {
      console.log(error.message);
    }
  },
  AddUnit: async (unit) => {
    try {
      const response = await axios.post(`${HR_API_URL}/add-unit`, { unit });      
      set({ Unit: response.data.newUnit })
    } catch (error) {
      console.log(error.message);
    }
  },
  getVendors: async () => {
    try {
      const response = await axios.get(`${HR_API_URL}/get-vendors`);
      set({ vendors: response.data.vendors });
    } catch (error) {
      console.log(error.message);
    }
  },
  editVendor: async (id, vendorname, contact, email, address) => {
    try {
      const response = await axios.put(`${HR_API_URL}/edit-vendor`, { id, vendorname, contact, email, address });
      set((state) => ({
        vendors: state.vendors.map((vendor) =>
          vendor._id === id ? response.data : vendor
        ),
      }));
      return response.data;
    } catch (error) {
      console.error("Error updating doctor:", error);
      throw error;
    }
  },
  addVendor: async (vendorname, contact, email, address) => {
    try {
      const response = await axios.post(`${HR_API_URL}/add-item-vendor`, { vendorname, contact, email, address });
      set({ vendor: response.data.newVendor })
    } catch (error) {
      console.log(error.message);
    }
  },
  addItemStock: async (itemName, unit, quantity,branch) => {
    try {
      const response = await axios.post(`${HR_API_URL}/add-item-stock`, { itemName, unit, quantity, branch });
      if (response.data.message === "Item already added") {
        return { success: false, message: response.data.message };
      }
      else {
        set({ stock: response.data.newStock });
        return { success: true, message: "Stock added successfully" };
      }
    } catch (error) {
      console.log(error.message);
      return { success: false, message: "Error adding stock" };
    }
  },
  getMedicalStock: async (branch) => {
    try {
      const response = await axios.get(`${HR_API_URL}/get-medical-stock/${branch}`);
      set({ medicalStock: response.data.medicalStock });
    } catch (error) {
      console.log(error.message);
    }
  },
  placeOrder: async (items) => {
    try {
      const response = await axios.post(`${HR_API_URL}/place-item-order`, { items });
      set({ order: response.data.newOrder })
    } catch (error) {
      console.log(error.message);
    }
  },
  getOrder: async (ids) => {
    try {
      const response = await axios.get(`${HR_API_URL}/getItemOrder`, {
        params: {
          ids
        }
      });
      set({ Orders: response.data.orders });
      set({orderBillAmount: response.data.totalAmount})
    } catch (error) {
      console.log(error.message);
    }
  },
   getMedicalOrder: async (ids) => {
    try {
      const response = await axios.get(`${HR_API_URL}/getMedicalOrder`, {
        params: {
          ids
        }
      });
      set({ Orders: response.data.orders });
      set({orderBillAmount: response.data.totalAmount})
    } catch (error) {
      console.log(error.message);
    }
  },
  getMedicine: async () => {

    try {
      const response = await axios.get(`${HR_API_URL}/get-medicine`);

      set({ medicines: response.data.medicines });
    } catch (error) {
      console.log(error.message);
    }
  },
  AddMedicine: async (medicine) => {
    try {
      const response = await axios.post(`${HR_API_URL}/add-medicine`, { medicine });

      set({ Medicine: response.data.newMedicine })
    } catch (error) {
      console.log(error.message);
    }
  }
  ,
  getPotency: async () => {
    try {
      const response = await axios.get(`${HR_API_URL}/get-potency`);

      set({ potencys: response.data.potencys });
    } catch (error) {
      console.log(error.message);
    }
  },
  AddPotency: async (potency) => {
    try {
      const response = await axios.post(`${HR_API_URL}/add-potency`, { potency });
      set({ Potency: response.data.newPotency })
    } catch (error) {
      console.log(error.message);
    }
  },
  getMedicalVendors: async () => {
    try {
      const response = await axios.get(`${HR_API_URL}/get-medical-vendors`);
      set({ vendors: response.data.vendors });
    } catch (error) {
      console.log(error.message);
    }
  },
  editMedicalVendor: async (id, vendorname, contact, email, address) => {
    try {
      const response = await axios.put(`${HR_API_URL}/edit-medical-vendor`, { id, vendorname, contact, email, address });
      set((state) => ({
        vendors: state.vendors.map((vendor) =>
          vendor._id === id ? response.data : vendor
        ),
      }));
      return response.data;
    } catch (error) {
      console.error("Error updating vendor:", error);
      throw error;
    }
  },
  addMedicalVendor: async (vendorname, contact, email, address) => {
    try {
      const response = await axios.post(`${HR_API_URL}/add-medical-vendor`, { vendorname, contact, email, address });

      set({ vendor: response.data.newVendor })
    } catch (error) {
      console.log(error.message);
    }
  },
  addMedicineStock: async (medicineName, potency, quantity,branch) => {
    try {
      const response = await axios.post(`${HR_API_URL}/add-medicine-stock`, { medicineName, potency, quantity, branch });
      if (response.data.message === "Stock already exists") {
        set({ stockExistsMessage: 'This Stock already exists' });
      }
      else {
        set({ stock: response.data.newStock });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  getMedicalItem: async () => {
    try {
      const response = await axios.get(`${HR_API_URL}/get-medicine-item`)
      set({ medicalitems: response.data.medical_items });
    } catch (error) {
      console.log(error.message);
    }
  },
  placeOrder: async (medicine) => {
    try {
      const response = await axios.post(`${HR_API_URL}/place-medical-order`, { medicine });
      set({ order: response.data.newOrder })
    } catch (error) {
      console.log(error.message);
    }
  },
  getOrders: async (id) => {
    try {
      const response = await axios.get(`${HR_API_URL}/getItemOrders/${id}`);
      set({ordersPlaced:response.data.branchOrders})
    } catch (error) {
      console.log(error.message);
    }
  },
  getMedicalOrders: async (id) => {
    try {
      const response = await axios.get(`${HR_API_URL}/getMedicalOrders/${id}`);
      set({medicalOrders:response.data.branchOrders})
    } catch (error) {
      console.log(error.message);
    }
  },
  getBillImages: async (id) => {
    try {
      const response = await axios.get(`${HR_API_URL}/get-Bill-images/${id}`);
      set({ billImages: response.data.Images });
      set({ billImagesLength: response.data.length });
    } catch (error) {
      console.log(error.message);
    }
  },
  getCollection: async (branch, shift="") => {
    const response = await axios.get(`${HR_API_URL}/collections`, {
      params: {
        branch,
        shift
      }
    });
    set({ collection: response.data.patientsCollection });
  },
  getAllCollection: async (branch) => {
    const response = await axios.get(`${HR_API_URL}/allCollection/${branch}`);
    set({ branchCollection: response.data.branchCollection });
  },
  getEveryCollection: async (branch) => {
    const response = await axios.get(`${HR_API_URL}/everyCollection`, {
      params: {
        branch
      }
    });
    set({ collection: response.data.everyCollection });
  },
  getCourierPayment: async (id) => {
    const response = await axios.get(`${HR_API_URL}/getCourierPayment/${id}`);
    set({ courierPayment: response.data.patientsCourier });
    set({ branchCourierPayment: response.data.branchCourier });
  },
}));