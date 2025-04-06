import React, { useState } from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import DocSidebar from '../../components/Doctor/DocSidebar'
import { useParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import OrderMedicineBalanceModal from '../../components/Doctor/OrderMedicineBalanceModal';
import OrderMedicineHistoryModal from '../../components/Doctor/OrderMedicineHistoryModal';

const ApproveMedicines = () => {
  const location = useParams();
  const [isOrderMedicineModalOpen, setOrderMedicineModalIsOpen] = useState(false);
  const [isOrderMedicineHistoryModalOpen, setOrderMedicineHistoryModalIsOpen] = useState(false);

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
              <h1>Medicine : </h1>
              <div className='relative w-full '>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                  <Search className="size-4 text-blue-500" />
                </div>
                <select name="medicine" required id="medicine" className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
                  <option value="" disabled selected className='font-normal' >Select Medicine</option>
                  <option value="Medicine 1">Medicine 1</option>
                  <option value="Medicine 3">Medicine 2</option>
                </select>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <h1>Potency : </h1>
              <div className='relative w-full '>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                  <Search className="size-4 text-blue-500" />
                </div>
                <select name="potency" required id="potency" className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
                  <option value="" disabled selected className='font-normal' >Select Potency</option>
                  <option value="Potency 1">Potency 1</option>
                  <option value="Potency 3">Potency 2</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto mt-10 rounded-lg">
              <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                <thead className="bg-[#337ab7]  text-white">
                  <tr >
                    <th className="px-2 py-4 ">Count</th>
                    <th className="px-2 py-4 ">Item</th>
                    <th className="px-2 py-4 ">Quantity in Store</th>
                    <th className="px-2 py-4 ">Reorder Level</th>
                    <th className="px-2 py-4 ">Last Updated</th>
                    <th className="px-2 py-4 ">Issued Quantity</th>
                    <th className="px-2 py-4 ">Received Quantity</th>
                    <th className="px-2 py-4 ">Approval</th>
                    <th className="px-2 py-4 ">Status</th>
                  </tr>
                </thead>
                <tbody></tbody>
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