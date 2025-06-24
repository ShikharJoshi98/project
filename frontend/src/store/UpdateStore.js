import axios from "axios";
import { create } from "zustand";


export const HR_API_URL = `${import.meta.env.VITE_API_URL}/api/hr`;
axios.defaults.withCredentials = true;

export const useStore = create((set) => ({
  employees: [],
  items: [],
  vendors: [],
  billImages: [],
  billImagesLength:0,
  vendor: null,
  Item: null,
  stock: null,
  Unit: null,
  Tasks: [],
  units: [],
  order: [],
  medicines: [],
  Medicine: null,
  medicalitems: [],
  potencys: [],
  Potency: null,
  dueBalanceSum: [],
  collection: [],
  ordersPlaced: [],
  medicalStock:[],
  medSection: "general",
  medicalStockToggle: false,
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
      console.log(Item);
    } catch (error) {
      console.log(error.message);
    }
  }
  ,
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
      console.log(response.data.newUnit);
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
      console.log(response);
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
      console.log(response.data.newVendor);
      set({ vendor: response.data.newVendor })
    } catch (error) {
      console.log(error.message);
    }
  },
  addItemStock: async (itemName, unit, quantity,branch) => {
    try {
      const response = await axios.post(`${HR_API_URL}/add-item-stock`, { itemName, unit, quantity,branch });
      console.log(response.data.newStock);
      set({ stock: response.data.newStock });
    } catch (error) {
      console.log(error.message);
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
      console.log(items);
      const response = await axios.post(`${HR_API_URL}/place-item-order`, { items });
      console.log(response.data.newOrder)
      set({ order: response.data.newOrder })
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
      console.log(response.data.newPotency);
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
      console.log(response);
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
      const response = await axios.post(`${HR_API_URL}/add-medicine-stock`, { medicineName, potency, quantity,branch });
      set({ stock: response.data.newStock });
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
      console.log(response.data.newOrder)
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
  getBillImages: async (id) => {
    try {
      const response = await axios.get(`${HR_API_URL}/get-Bill-images/${id}`);
      set({ billImages: response.data.Images });
      set({ billImagesLength: response.data.length });
    } catch (error) {
      console.log(error.message);
    }
  },
  getTasks: async () => {
    try {
      const response = await axios.get(`${HR_API_URL}/place-medical-order`)
    } catch (error) {

    }
  },
  getCollection: async (branch) => {
    const response = await axios.get(`${HR_API_URL}/collections/${branch}`);
    set({ collection: response.data.patientsCollection });
    set({ dueBalanceSum: response.data.patientsDueBalances });  
  }
}));