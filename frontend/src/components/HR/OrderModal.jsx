import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { HR_API_URL, useStore } from "../../store/UpdateStore";
import axios from "axios";

const OrderModal = ({ onClose }) => {
  const { getItems, items, units, getUnits, getVendors, vendors, placeOrder } = useStore();
  const [itemStock, setItemStock] = useState([]);
  const getItemStock = async () => {
        const response = await axios.get(`${HR_API_URL}/get-item-stock`);
        setItemStock(response.data.itemStock);
    };
  

  useEffect(() => {
    getItems();
    getVendors();
    getUnits();
  }, [getItems, getVendors, getUnits]);
   useEffect(() => {
          try {
              getItemStock();
          } catch (error) {
              console.log("Error in fetch API hr getItemStock", error.message);
          }
      }, []);
  console.log(itemStock);
  const lowQuantityItems = itemStock.filter((item) => item.quantity <= item.reorder_level);
  console.log(lowQuantityItems);
  const [rows, setRows] = useState([
    {  itemName: lowQuantityItems?.itemName, unit: "", vendor: "", quantity: "", deliveryDate: ""  },
  ]);
  // Function to add a new row
 
   
  // Function to handle input changes
  const handleInputChange = (index, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  // Function to delete a row
  const deleteRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
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
                <th className="border p-2">Item Name</th>
                <th className="border p-2">Vendors</th>
                <th className="border p-2">Ordered Quantity</th>
                <th className="border p-2">Expected Delivery Date</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lowQuantityItems.map((row, index) => (
                <tr key={index} className="bg-blue-200">
                  {/* Item Name Dropdown */}
                  <td className="p-2">
                    <select
                      value=""
                      onChange={(e) => handleInputChange(index, "itemName", e.target.value)}
                      className="py-2 bg-white rounded-lg w-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900"
                    >
                      <option value="">Select Item</option>
                      {items.map((item, i) => (
                        <option key={i} value={item.itemName}>
                          {item.itemName}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Vendor Name Dropdown */}
                  <td className="p-2">
                    <select
                      value=""
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

                  {/* Quantity Input */}
                  <td className="p-2">
                    <input
                      type="number"
                      value={row.quantity}
                      onChange={(e) => handleInputChange(index, "quantity", e.target.value)}
                      className="w-full bg-white p-1 border border-gray-500 rounded"
                      min="1"
                    />
                  </td>

                  {/* Delivery Date Input */}
                  <td className="p-2">
                    <input
                      type="date"
                      value={row.deliveryDate}
                      onChange={(e) => handleInputChange(index, "deliveryDate", e.target.value)}
                      className="w-full bg-white p-1 border border-gray-500 rounded"
                    />
                  </td>

                  {/* Delete Button */}
                  <td className="p-2 text-center">
                    <button
                      onClick={() => deleteRow(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add Row Button */}
          
        </div>
        <button onClick={SubmitOrder} className="mt-4 cursor-pointer transition-all duration-300 mx-auto bg-blue-500 text-lg font-semibold w-fit rounded-lg text-white px-4 py-2  hover:bg-blue-600">Submit Order</button>
      </div>
    </div>
  );
};

export default OrderModal;
