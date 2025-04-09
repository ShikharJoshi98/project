import React, { useEffect, useState } from 'react'
import HRnavbar from '../../components/HR/HRnavbar'
import { MapPin } from 'lucide-react';
import AddItemModal from '../../components/HR/AddItemModal';
import VendorModal from '../../components/HR/VendorModal';
import AddItemStockModal from '../../components/HR/AddItemStockModal';
import OrderModal from '../../components/HR/OrderModal';
import { useNavigate } from 'react-router-dom';
import HRSidebar from '../../components/HR/HRSidebar';

const ItemStock = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [isItemModalOpen, setItemModalIsOpen] = useState(false);
  const [isVendorModalOpen, setVendorModalIsOpen] = useState(false);
  const [isAddStockModalOpen, setAddStockModalIsOpen] = useState(false);
  const [isOrderModalOpen, setOrderModalIsOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const updateDate = () => {
      const date = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "Asia/Kolkata",
      });
      setCurrentDate(date);
    };
    updateDate();
  }, []);
  useEffect(() => {
    const savedItemState = localStorage.getItem("modalItemState");
    const savedVendorState = localStorage.getItem("modalVendorState");
    const savedStockState = localStorage.getItem("modalStockState");
    const savedOrderState = localStorage.getItem("modalOrderState");
    if (savedItemState === "open") {
      setItemModalIsOpen(true);
    }
    if (savedVendorState === "open") {
      setVendorModalIsOpen(true);
    }
    if (savedStockState === "open") {
      setAddStockModalIsOpen(true);
    }
    if (savedOrderState === "open") {
      setOrderModalIsOpen(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("modalItemState", isItemModalOpen ? "open" : "closed");
    localStorage.setItem("modalVendorState", isVendorModalOpen ? "open" : "closed");
    localStorage.setItem("modalStockState", isAddStockModalOpen ? "open" : "closed");
    localStorage.setItem("modalOrderState", isOrderModalOpen ? "open" : "closed");
  }, [isItemModalOpen, isVendorModalOpen, isAddStockModalOpen, isOrderModalOpen]);
  return (
    <div>
      <HRnavbar />
      <div className='flex'>
        <HRSidebar/>
        <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
          <div className='flex md:flex-row  h-fit flex-col items-center justify-between '>
            <h1 className='text-stone-800 w-fit text:lg sm:text-xl font-semibold md:text-3xl m-2 md:m-10 bg-[#dae5f4] p-3 md:p-5 rounded-lg'>Welcome to the HR Admin Panel</h1>
            <h1 className='text-stone-800 flex text-lg sm:text-xl items-center gap-2 w-fit font-semibold md:text-3xl m-2 md:m-10   bg-[#dae5f4] p-3 md:p-5 rounded-lg'><span>    <MapPin />
            </span>Dombivali</h1>
          </div>
          <div className='bg-[#e9ecef]  w-auto p-5 mx-10 my-6 rounded-lg '>
            <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Items Stock Dombivali</h1>
            <h1 className=' text-blue-500 font-semibold mb-3 text-lg md:text-2xl mt-4'>{currentDate}</h1>
            <hr className='h-[0.5px] px-5 border-none bg-blue-500' />
            <div className='sm:flex grid grid-cols-2 mt-5 sm:flex-row text-white font-semibold  gap-2 sm:gap-10 justify-center items-center md:gap-20 text-[6px] sm:text-[8px] md:text-base'>
              <button onClick={() => setItemModalIsOpen(true)} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>ADD ITEMS/UNIT LIST</button>
              <button onClick={() => setVendorModalIsOpen(true)} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>VENDORS</button>
              <button onClick={() => setAddStockModalIsOpen(true)} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>ADD STOCK</button>
              <button onClick={() => setOrderModalIsOpen(true)} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>PLACE ORDER</button>
            </div>
          </div>
        </div>
      </div>
      {isItemModalOpen && <AddItemModal onClose={() => setItemModalIsOpen(false)} />}
      {isVendorModalOpen && <VendorModal onClose={() => setVendorModalIsOpen(false)} />}
      {isAddStockModalOpen && <AddItemStockModal onClose={() => setAddStockModalIsOpen(false)} />}
      {isOrderModalOpen && <OrderModal onClose={() => setOrderModalIsOpen(false)} />}
    </div>
  )
}

export default ItemStock