import axios  from "axios";
import { create } from "zustand";


const HR_API_URL = 'http://localhost:4000/api/hr';
axios.defaults.withCredentials = true;

export const useStore = create((set) => ({
  docusers: [],
  receptionistusers: [],
  items: [],
  vendors: [],
  vendor:null,
  Item: null,
  stock: null,
  Unit:null,
  units: [],
  order: [],
  medicines: [],
  Medicine: null,
  potencys: [],
  Potency: null,
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
      
        set({ receptionistusers: response.data.detail });
    } catch (error) {
      console.log(error.message);
    }
  },
  updateDoctor: async (id, updatedData) => {
    
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
      const response = await axios.post(`${HR_API_URL}/add-item`, {  item: newitem  });
      
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
      const response = await axios.post(`${HR_API_URL}/add-unit`, {  unit });
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
  editVendor: async (id,vendorname, contact, email, address) => {
    try {
      
      const response = await axios.put(`${HR_API_URL}/edit-vendor`, {id,vendorname, contact, email, address});
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
  addVendor: async (vendorname,contact,email,address) => {
    try {
      const response = await axios.post(`${HR_API_URL}/add-item-vendor`, { vendorname, contact, email, address });
      console.log(response.data.newVendor);
      set({ vendor:response.data.newVendor})
    } catch (error) {
      console.log(error.message);
    }
  },
  addItemStock: async (itemName, unit, quantity) => {
      try {
        const response = await axios.post(`${HR_API_URL}/add-item-stock`, {itemName, unit, quantity });
        console.log(response.data.newStock);
        set({ stock: response.data.newStock });
      } catch (error) {
        console.log(error.message);
      }
  },
  placeOrder: async (items) => {
    try {
      const response = await axios.post(`${HR_API_URL}/place-item-order`, {items});
      console.log(response.data.newOrder)
      set({order:response.data.newOrder})
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
     const response = await axios.post(`${HR_API_URL}/add-medicine`, {  medicine });
     
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
     const response = await axios.post(`${HR_API_URL}/add-potency`, {  potency });
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
  editMedicalVendor: async (id,vendorname, contact, email, address) => {
    try {      
      const response = await axios.put(`${HR_API_URL}/edit-medical-vendor`, {id,vendorname, contact, email, address});
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
  addMedicalVendor: async (vendorname,contact,email,address) => {
    try {
      const response = await axios.post(`${HR_API_URL}/add-medical-vendor`, { vendorname, contact, email, address });
      
      set({ vendor:response.data.newVendor})
    } catch (error) {
      console.log(error.message);
    }
  },
  addMedicineStock: async (medicineName, potency, quantity) => {
    try {
      const response = await axios.post(`${HR_API_URL}/add-medicine-stock`, {medicineName, potency, quantity });
      console.log(response.data.newStock);
      set({ stock: response.data.newStock });
    } catch (error) {
      console.log(error.message);
    }
}
}));