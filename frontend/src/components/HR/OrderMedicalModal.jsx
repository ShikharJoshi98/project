import { useEffect, useState } from "react";
import { HR_API_URL, useStore } from "../../store/UpdateStore";
import { useAuthStore } from "../../store/authStore";
import MultiSelectInput from "../Doctor/MultiSelectInput";
import axios from "axios";
import { updateDate } from "../../store/todayDate";
import UploadBillModal from "./UploadBillModal";
import { FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { LuLoaderCircle } from "react-icons/lu";
import AddBillNumberModal from "../AddBillNumberModal";

const OrderModal = ({ onClose }) => {
  const { getMedicalVendors, vendors, getMedicalStock, medicalStock, medicalStockToggle, getMedicalOrders, medicalOrders } = useStore();
  const { user } = useAuthStore();
  const [orderId, setOrderId] = useState(null);
  const [formRows, setFormRows] = useState([]);
  const [receivedQuantity, setReceivedQuantity] = useState(0);
  const [lowQuantityItems, setLowQuantityItems] = useState([]);
  const todayDate = updateDate();
  const [billModal, setBillModal] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [billImagesLength, setBillImagesLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [billNumberModal, setBillNumberModal] = useState(false);
  const [orderSubmitLoading, setOrderSubmitLoading] = useState(false);

  useEffect(() => {
    getMedicalStock(user?.branch)
    getMedicalVendors();
    const timeout = setTimeout(() => {
      setLoading(true);
    }, 200);
    getMedicalOrders(user?.branch).finally(() => {
      clearTimeout(timeout);
      setLoading(false);
    });
  }, [getMedicalStock, getMedicalVendors, submit]);

  const getFutureDate = (daysToAdd = 7) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split("T")[0];
  };
  const vendorArray = vendors.map((vendor) => vendor?.vendorname);

  useEffect(() => {
    if (medicalStock.length > 0) {
      const filtered = medicalStock.filter(item => item?.quantity <= item?.reorder_level && item?.is_order_placed === false);
      setLowQuantityItems(filtered);
      const initialFormRows = lowQuantityItems.map(item => ({
        medicineName: item?.medicineName,
        potency: item?.potency,
        pack: '30 ML',
        vendor: [],
        quantity: 1,
        deliveryDate: getFutureDate(7),
        medicineId: item?._id,
        branch: user?.branch
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

  const handleVendorChange = (index, selectedVendors) => {
    setFormRows(prevRows =>
      prevRows.map((row, i) =>
        i === index ? { ...row, vendor: selectedVendors } : row
      )
    );
  };

  const deleteRow = (index) => {
    setFormRows(prevRows => prevRows.filter((_, i) => i !== index));
  };
  async function SubmitOrder(e) {
    e.preventDefault();
    try {
      setOrderSubmitLoading(true);
      const hasEmptyVendors = formRows.some(row => row.vendor.length === 0);
      if (hasEmptyVendors) {
        alert("Please select at least one vendor for each item.");
        return;
      }
      const formattedFormRows = await Promise.all(formRows.map(async (row) => {
        const [year, month, day] = row.deliveryDate.split("-");
        const item = medicalStock.find(i => i?._id === row.medicineId);
        await axios.patch(`${HR_API_URL}/update-medical-stock/${item?._id}`, { is_order_placed: true });

        return {
          ...row,
          deliveryDate: `${day}-${month}-${year}`,
          medicineId: item ? item?._id : "",
        };
      }));
      await axios.post(`${HR_API_URL}/place-medical-order`, { formRows: formattedFormRows });
      alert("Order was placed");
      await axios.post(`${HR_API_URL}/sendMedicalVendorEmail/${user?.branch}`, formattedFormRows);
      await getMedicalStock(user?.branch);
      setSubmit(prev => !prev);
      setOrderSubmitLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }
  const receiveOrder = async (OrderId, medicineId, medicine) => {
    await axios.patch(`${HR_API_URL}/updateMedicalReceivedOrder/${OrderId}/${medicineId}`, {
      receivedQuantity,
      order_Delivered_Flag: true,
      received_date: todayDate
    });
    await axios.post(`${HR_API_URL}/addMedicalOrderId`, { orderID: OrderId, medicineID: medicineId, medicine: medicine });
    await axios.patch(`${HR_API_URL}/update-medical-stock/${medicine?._id}`, { is_order_placed: false });
    setSubmit(prev => !prev);
  }

  return (
    <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
      <div className="bg-[#e9ecef] max-h-[90vh] max-w-[99vw] flex flex-col w-full rounded-xl p-6 md:p-10 shadow-lg">
        <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"><RxCross2 size={24} /></button>
        <div className="overflow-y-auto">
          <h1 className="text-blue-500 text-2xl md:text-3xl mb-6 text-center font-semibold">Place Order</h1>
          <div className="p-4 rounded-lg">
            <table className="w-full border border-gray-300">
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
                    <td className="p-2">
                      <select value={`${row.medicineName}${row.potency}`} required onChange={(e) => { const selected = lowQuantityItems.find((item) => item.medicineName + item.potency === e.target.value); if (selected) { handleInputChange(index, "medicineName", selected.medicineName); handleInputChange(index, "potency", selected.potency); } }} className="py-2 bg-white rounded-lg w-50 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900">
                        <option value="">Select Item</option>
                        {lowQuantityItems.map((item, i) => (
                          <option key={i} value={item?.medicineName + item?.potency}>
                            {item?.medicineName} {item?.potency}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-2">
                      <input type="text" value={row.pack} onChange={(e) => handleInputChange(index, "pack", e.target.value)} className="w-full bg-white p-1 border border-gray-500 rounded" />
                    </td>
                    <td className="p-2 w-72">
                      <MultiSelectInput Options={vendorArray} setSelectedOptions={(options) => handleVendorChange(index, options)} selectedOptions={row.vendor} />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={row.quantity}
                        onChange={(e) => handleInputChange(index, "quantity", e.target.value)}
                        className="w-50 bg-white p-1 border border-gray-500 rounded"
                        min="1"
                        required
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="date"
                        required
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={SubmitOrder} className="mt-4 cursor-pointer transition-all duration-300 mx-auto block bg-blue-500 text-lg font-semibold w-fit rounded-lg text-white px-4 py-2  hover:bg-blue-600">{orderSubmitLoading ? <LuLoaderCircle className='mx-auto animate-spin' size={24} /> : 'Submit Order'}</button>
          <h1 className="text-blue-500 text-2xl md:text-3xl mt-10 mb-6 text-center font-semibold">
            Medical Order Details
          </h1>
          {loading ? <LuLoaderCircle className="animate-spin mx-auto mt-10" /> : <div className="overflow-x-auto">
            <table className=" min-w-[1200px] mx-auto bg-white border border-gray-300 shadow-md rounded-lg">
              <thead>
                <tr className=" bg-blue-500 text-white text-sm">
                  <th className="py-2 px-1 border">Order Date</th>
                  <th className="py-2 px-1 border">Vendor</th>
                  <th className="py-2 px-1 border">Bill</th>
                  <th className="py-2 px-1 border">Order Items</th>
                  <th className="py-2 px-1 border">Expected Delivery Date</th>
                  <th className="py-2 px-1 border">Order Status</th>
                  <th className="py-2 px-1 border">Doctor Approval</th>
                </tr>
              </thead>
              <tbody className="bg-gray-200 text-black">
                {medicalOrders.map((order, orderIndex) =>
                  order.formRows.map((row, rowIndex) => (
                    <tr key={`${orderIndex}-${rowIndex}`} className="bg-blue-200">
                      {rowIndex === 0 && (
                        <td rowSpan={order?.formRows.length} className="py-2 px-1 text-center border">
                          {order?.orderDate}
                        </td>
                      )}
                      <td className="py-2 px-1 border">{row?.vendor.join(", ")}</td>
                      {rowIndex === 0 && <td rowSpan={order?.formRows.length} className="py-2 px-1 border"><button onClick={() => { setBillModal(true); setOrderId(order?._id) }} className="bg-blue-500 text-white py-1 cursor-pointer px-2 flex items-center rounded-md gap-1">Upload <FaPlus /></button>
                        {(!order?.billNumber) ? <button onClick={() => { setBillNumberModal(true); setOrderId(order?._id) }} className="bg-blue-500 text-white mt-4 mx-auto py-1 cursor-pointer px-2 flex items-center rounded-md gap-1">Add Bill No.</button> : <p className="text-center mt-4">{`B No. - ${order?.billNumber}`}</p>}
                      </td>
                      }
                      {rowIndex === 0 && <td rowSpan={order?.formRows.length} className="py-2 px-1 border ">
                        <table className="w-full bg-white border border-gray-300 shadow-md rounded-lg">
                          <thead>
                            <tr className=" bg-blue-500 text-white text-sm">
                              <th className="py-2 px-1 border">Medicine</th>
                              <th className="py-2 px-1 border">Pack</th>
                              <th className="py-2 px-1 border">Ordered Quantity</th>
                              <th className="py-2 px-1 border">Received Quantity</th>
                              {row?.order_Delivered_Flag === true && <th className="py-2 px-1 border">Balance</th>}
                            </tr>
                          </thead>
                          <tbody>
                            {order.formRows.map((formRow, idx) => (
                              <tr key={idx} className="bg-blue-200">
                                <td className="py-1 px-1 border text-center">{formRow?.medicineName}</td>
                                <td className="py-1 px-1 border text-center">{formRow?.pack}</td>
                                <td className="py-1 px-1 border text-center">{formRow?.quantity}</td>
                                <td className="py-1 px-1 border text-center">{formRow?.order_Delivered_Flag === true ? formRow?.receivedQuantity : <div className="flex flex-col items-center gap-2"><input type="number" onChange={(e) => setReceivedQuantity(e.target.value)} className="bg-white w-20 border border-gray-400 focus:outline-none pl-1 py-1 rounded-md" /><button onClick={() => receiveOrder(order?._id, formRow?._id, formRow?.medicineId)} className="bg-blue-500 cursor-pointer text-white py-1 px-3 rounded-md">Add</button></div>}</td>
                                {formRow?.order_Delivered_Flag === true && <td className="py-1 px-1 border text-center">{formRow?.order_Delivered_Flag === true ? (formRow?.quantity - formRow?.receivedQuantity) : '-'}</td>}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>}
                      <td className="py-2 px-1 border text-center">{row?.deliveryDate}</td>
                      <td className="py-2 px-1 border text-center"><span className={`border-1 ${row?.order_Delivered_Flag === true ? 'text-green-500 border-green-500' : 'text-red-500 border-red-500'}  rounded-md py-1 px-2`}>{row?.order_Delivered_Flag === true ? 'Delivered' : 'Pending'}</span></td>
                      <td className="py-2 px-1 border text-center"><span className={`border-1 ${row?.doctor_Approval_Flag === true ? 'text-green-500 border-green-500' : 'text-red-500 border-red-500'}  rounded-md py-1 px-2`}>{row?.doctor_Approval_Flag === true ? 'Approved' : 'Pending'}</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>}
        </div>
      </div>
      {billModal && <UploadBillModal setBillImagesLength={setBillImagesLength} onClose={() => setBillModal(false)} orderId={orderId} />}
      {billNumberModal && <AddBillNumberModal onClose={() => setBillNumberModal(false)} orderId={orderId} setSubmit={setSubmit} type='medicine' />}
    </div>

  );
};

export default OrderModal;
