import React, { useEffect, useState } from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import DocSidebar from '../../components/Doctor/DocSidebar'
import { useParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import OrderMedicineBalanceModal from '../../components/Doctor/OrderMedicineBalanceModal';
import OrderMedicineHistoryModal from '../../components/Doctor/OrderMedicineHistoryModal';
import { useStore } from '../../store/UpdateStore';
import axios from 'axios';
import { DOC_API_URL } from '../../store/DocStore';

const ApproveMedicines = () => {
  const location = useParams();
  const [isOrderMedicineModalOpen, setOrderMedicineModalIsOpen] = useState(false);
  const [isOrderMedicineHistoryModalOpen, setOrderMedicineHistoryModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchPotency, setSearchPotency] = useState('');
   const [submit, setSubmit] = useState(false);
  const { getMedicine, medicines, potencys, getPotency, getMedicalStock, medicalStock, medicalStockToggle } = useStore();

  useEffect(() => {
    getMedicine();
    getPotency();
    getMedicalStock(location.location);
  }, [getMedicine, getPotency, getMedicalStock, medicalStockToggle,submit]);

  const timeStamp = (isoDate) => {
        const date = new Date(isoDate);
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true
        };

        const formattedDate = date.toLocaleString("en-US", options);
        return formattedDate;
  }
  
  const ApproveMedicalStock = async (id) => {
        try {
            await axios.patch(`${DOC_API_URL}/approveMedicalStock/${id}`,
                {
                    docApproval_flag: true,
                    approval_flag_new:false
                 }
            )
            setSubmit(prev => !prev);
        } catch (error) {
            console.log(error.message);
        }
    }

  const filteredMedicalStock = medicalStock.filter((medicine) => {
    const matchesMedicine = searchTerm === '' || medicine?.medicineName === searchTerm;
    const matchesPotency = searchPotency === '' || medicine?.potency === searchPotency;
    return matchesMedicine && matchesPotency;
  });
  return (
    <div>
      <Docnavbar />
      <div className='flex'>
        <DocSidebar />
        <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
          <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
            <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Medicine Stock {location.location}</h1>
            <div className='sm:flex grid grid-cols-1 mt-10 sm:flex-row text-white font-semibold  gap-2 sm:gap-9 justify-center items-center md:gap-9  md:text-lg'>
              <button onClick={() => setOrderMedicineHistoryModalIsOpen(true)} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>Order History</button>
              <button onClick={() => setOrderMedicineModalIsOpen(true)} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>Order Balances</button>
            </div>
            <div className='flex flex-col gap-2'>
              <p>Search Medicine :</p>
              <select
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                name="select medicine"
                id="medicine-select"
                className="py-2 rounded-lg w-full bg-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900"
              >
                <option value="">Select Medicines</option>
                {medicines.map((medicine, index) => (
                  <option key={index}>{medicine?.medicine}</option>
                ))}
              </select>
            </div>
            <div className='flex flex-col gap-2 mt-5'>
              <p>Search Potency :</p>
              <select
                value={searchPotency}
                onChange={(e) => setSearchPotency(e.target.value)}
                name="select potency"
                id="potency-select"
                className="py-2 rounded-lg w-full bg-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900"
              >
                <option value="">Select Potencys</option>
                {potencys.map((el, index) => (
                  <option key={index}>{el?.potency}</option>
                ))}
              </select>
            </div>
            <div className="overflow-x-auto mt-10 rounded-lg">
              <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                <thead className="bg-[#337ab7]  text-white">
                  <tr >
                    <th className="px-2 py-4 ">Count</th>
                    <th className="px-2 py-4 ">Medicine</th>
                    <th className="px-2 py-4 ">Potency</th>
                    <th className="px-2 py-4 ">Quantity in Store</th>
                    <th className="px-2 py-4 ">Reorder Level</th>
                    <th className="px-2 py-4 ">Last Updated</th>
                    <th className="px-2 py-4 ">Issued Quantity</th>
                    <th className="px-2 py-4 ">Received Quantity</th>
                    <th className="px-2 py-4 ">Approval</th>
                    <th className="px-2 py-4 ">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    filteredMedicalStock?.map((medicine, index) => (
                      <tr className={`${medicine?.docApproval_flag === false ? 'bg-red-200' : 'bg-blue-200'}`}>
                        <td className="px-1 py-2 text-center">{index + 1}</td>
                        <td className="px-1 py-2 text-center ">{medicine?.medicineName}</td>
                        <td className="px-1 py-2 text-center ">{medicine?.potency}</td>
                        <td className="px-1 py-2 text-center ">{medicine?.quantity}</td>
                        <td className="px-1 py-2 text-center ">{medicine?.reorder_level}</td>
                        <td className="px-1 py-2 text-center ">{timeStamp(medicine?.last_updated)}</td>
                        <td className="px-1 py-2 text-center ">{medicine?.issue_quantity}</td>
                        <td className="px-1 py-2 text-center ">{medicine?.approval_flag_receive === true ? medicine?.receive_quantity : medicine?.approval_flag_new === true ? medicine?.receive_quantity : 0}</td>
                        <td className="px-1 py-2 text-center "> {medicine?.docApproval_flag === false ? <button onClick={() => ApproveMedicalStock(medicine?._id)}className='px-2 rounded-md py-0.5 cursor-pointer bg-green-500 text-white'>Click to Approve</button> : <span className='border-2 px-2 rounded-md py-0.5 text-blue-500'>APPROVED</span>}</td>
                        <td className="px-1 py-2 text-center ">{medicine?.approval_flag_receive === true ? "ITEM RECEIVED(ORDER)" : medicine?.approval_flag_issue === true ? "ITEM ISSUED" : medicine?.approval_flag_new ? "NEW ITEM" : "NEW ITEM ADDED"}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isOrderMedicineModalOpen && <OrderMedicineBalanceModal location={location.location} onClose={() => setOrderMedicineModalIsOpen(false)} />}
      {isOrderMedicineHistoryModalOpen && <OrderMedicineHistoryModal location={location.location} onClose={() => setOrderMedicineHistoryModalIsOpen(false)} />}

    </div>
  )
}

export default ApproveMedicines