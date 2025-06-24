import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useStore } from "../../store/UpdateStore";
import { useAuthStore } from "../../store/authStore";

const OrderModal = ({ onClose }) => {
  // const { getMedicalItem, medicalitems,  getMedicalVendors, vendors, placeOrder } = useStore();
  const { getMedicine, medicines, potencys, getPotency, getMedicalVendors, vendors, getMedicalStock, medicalStock, medicalStockToggle } = useStore();
  const { user } = useAuthStore();
  const [formRows, setFormRows] = useState([]);
  const [lowQuantityItems, setLowQuantityItems] = useState([]);
  useEffect(() => {
    getMedicalStock(user?.branch)
    getMedicalVendors();
  }, [getMedicalStock, getMedicalVendors]);
  const getFutureDate = (daysToAdd = 7) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split("T")[0];
  };
  useEffect(() => {
    if (medicalStock.length > 0) {
      const filtered = medicalStock.filter(item => item?.quantity <= item?.reorder_level);
      setLowQuantityItems(filtered);
      const initialFormRows = lowQuantityItems.map(item => ({
        medicineName: item?.medicineName,
        potency: item?.potency,
        pack:'30 ML',
        vendor: [],
        quantity: 1,
        deliveryDate: getFutureDate(7)
      }));
      setFormRows(initialFormRows);
    }
  }, [medicalStock]);

  const handleInputChange = (index, field, value) => {
    setFormRows(prevRows =>
      prevRows.map((row, i) =>
        i === index ? { ...row, [field]: value } : row
      )
    );
  };

  // Function to handle input changes
  const handleVendorChange = (index, selectedVendors) => {
    setFormRows(prevRows =>
      prevRows.map((row, i) =>
        i === index ? { ...row, vendor: selectedVendors } : row
      )
    );
  };

  // Function to delete a row
  const deleteRow = (index) => {
    setFormRows(prevRows => prevRows.filter((_, i) => i !== index));
  };

  function SubmitOrder(e) {
    e.preventDefault();
    try {
      console.log(rows);
      placeOrder(rows);
      alert("Order was placed")
    } catch (error) {
      console.log(error.message);
    }

  }
  console.log(lowQuantityItems);

  return (
    <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
      <div className="bg-[#e9ecef] max-h-[90vh] max-w-[80vw] overflow-y-auto flex flex-col w-full rounded-xl p-6 md:p-10 shadow-lg">
        <button
          onClick={onClose}
          className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"
        >
          <X size={24} />
        </button>
        <h1 className="text-blue-500 text-2xl md:text-3xl mb-6 text-center font-semibold">
          Place Order
        </h1>
        <div className="p-4 rounded-lg overflow-x-auto">
          <table className="w-full border  border-gray-300">
            <thead>
              <tr className="bg-blue-500 text-white font-semibold">
                <th className="border p-2">Order Items</th>
                <th className="border p-2">PACK</th>
                <th className="border p-2">Vendors</th>
                <th className="border p-2">Ordered Quantity</th>
                <th className="border p-2">Expected Delivery Date</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {formRows.map((row, index) => (
                <tr key={row.id} className="bg-blue-200">
                  {/* Item Name Dropdown */}
                  <td className="p-2">
                    <select
                      value={`${row.medicineName}${row.potency}`}
                      required
                      onChange={(e) => {
                        const selected = lowQuantityItems.find(
                          (item) => item.medicineName + item.potency === e.target.value
                        );
                        if (selected) {
                          handleInputChange(index, "medicineName", selected.medicineName);
                          handleInputChange(index, "potency", selected.potency);
                        }
                      }}
                      className="py-2 bg-white rounded-lg w-50 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900"
                    >
                      <option value="">Select Item</option>
                      {lowQuantityItems.map((item, i) => (
                        <option key={i} value={item?.medicineName + item?.potency}>
                          {item?.medicineName} {item?.potency}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2">
                    <input
                        type="text"
                        value={row.pack}
                        onChange={(e) => handleInputChange(index, "pack", e.target.value)}
                        className="w-full bg-white p-1 border border-gray-500 rounded"                        
                      />                        
                    </td>

                  
                    {/* <td className="p-2">
                      <select
                        value={row.vendor}
                        onChange={(e) => handleInputChange(index, "vendor", e.target.value)}
                        className="py-2 bg-white rounded-lg w-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900"
                      >
                        <option value="">Select Vendor</option>
                        {vendors.map((el, i) => (
                          <option key={i} value={el.vendorname}>
                            {el.vendorname}
                          </option>
                        ))}
                      </select>
                    </td>

                    
                    <td className="p-2">
                      <input
                        type="number"
                        value={row.quantity}
                        onChange={(e) => handleInputChange(index, "quantity", e.target.value)}
                        className="w-full bg-white p-1 border border-gray-500 rounded"
                        min="1"
                      />
                    </td>

                    
                    <td className="p-2">
                      <input
                        type="date"
                        value={row.deliveryDate}
                        onChange={(e) => handleInputChange(index, "deliveryDate", e.target.value)}
                        className="w-full bg-white p-1 border border-gray-500 rounded"
                      />
                    </td>

                    
                    <td className="p-2 text-center">
                      <button
                        onClick={() => deleteRow(index)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td> */}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add Row Button */}
          {/* <button
              onClick={addRow}
              className="mt-4 cursor-pointer transition-all duration-300 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Row
            </button> */}
        </div>
        <button onClick={SubmitOrder} className="mt-4 cursor-pointer transition-all duration-300 mx-auto bg-blue-500 text-lg font-semibold w-fit rounded-lg text-white px-4 py-2  hover:bg-blue-600">Submit Order</button>
      </div>
    </div>
  );
};

export default OrderModal;
