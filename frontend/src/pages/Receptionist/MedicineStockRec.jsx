import React, { useState } from 'react'
import RecNavbar from '../../components/Receptionist/RecNavbar'
import RecSidebar from '../../components/Receptionist/RecSidebar'
import AddMedicineModal from '../../components/HR/AddMedicineModal'
import AddMedicalStockModel from '../../components/HR/AddMedicalStockModel'
import VendorMedicalModal from '../../components/HR/VendorMedicalModal';
import OrderMedicalModal from '../../components/HR/OrderMedicalModal';

const MedicineStockRec = () => {
    const [isMedicineModalOpen, setMedicineModalIsOpen] = useState(false);
      const [isVendorModalOpen, setVendorModalIsOpen] = useState(false);
      const [isAddStockModalOpen, setAddStockModalIsOpen] = useState(false);
      const [isOrderModalOpen, setOrderModalIsOpen] = useState(false);
    return (
        <div>
            <RecNavbar />
            <div className="flex">
                <RecSidebar />
                <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
                    <div className='bg-[#e9ecef]  w-auto p-5 mx-10 my-6 rounded-lg '>
                        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Medicine Stock </h1>
                        <div className='sm:flex grid grid-cols-2 mt-5 sm:flex-row text-white font-semibold  gap-2 sm:gap-10 justify-center items-center md:gap-20 text-[6px] sm:text-[8px] md:text-base'>
                            <button onClick={() => setMedicineModalIsOpen(true)} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>ADD MEDICINE/POTENCY LIST</button>
                            <button onClick={() => setVendorModalIsOpen(true)} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>VENDORS</button>
                            <button onClick={() => setAddStockModalIsOpen(true)} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>ADD STOCK</button>
                            <button onClick={() => setOrderModalIsOpen(true)} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>PLACE ORDER</button>
                        </div>
                    </div>
                </div>
            </div>
            {isMedicineModalOpen && <AddMedicineModal onClose={() => setMedicineModalIsOpen(false)} />}
            {isVendorModalOpen && <VendorMedicalModal onClose={() => setVendorModalIsOpen(false)} />}
            {isAddStockModalOpen && <AddMedicalStockModel onClose={() => setAddStockModalIsOpen(false)} />}
            {isOrderModalOpen && <OrderMedicalModal onClose={() => setOrderModalIsOpen(false)} />}
        </div>
    )
}

export default MedicineStockRec