import React, { useState } from 'react'
import RecNavbar from '../../components/Receptionist/RecNavbar'
import RecSidebar from '../../components/Receptionist/RecSidebar'
import AddItemModal from '../../components/HR/AddItemModal';
import VendorModal from '../../components/HR/VendorModal';
import AddItemStockModal from '../../components/HR/AddItemStockModal';
import OrderModal from '../../components/HR/OrderModal';

const ItemStockRec = () => {
    const [isItemModalOpen, setItemModalIsOpen] = useState(false);
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
                        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Items Stock Dombivali</h1>
                        <div className='sm:flex grid grid-cols-2 mt-5 sm:flex-row text-white font-semibold  gap-2 sm:gap-10 justify-center items-center md:gap-20 text-[6px] sm:text-[8px] md:text-base'>
                            <button onClick={() => setItemModalIsOpen(true)} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>ADD ITEMS/UNIT LIST</button>
                            <button onClick={() => setVendorModalIsOpen(true)} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>VENDORS</button>
                            <button onClick={() => setAddStockModalIsOpen(true)} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>ADD STOCK</button>
                            <button onClick={() => setOrderModalIsOpen(true)} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>PLACE ORDER</button>
                        </div>
                        <div className="overflow-x-auto mt-10 rounded-lg">
                            <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                                <thead className="bg-[#337ab7] whitespace-nowrap text-white">
                                    <tr >
                                        <th className="px-1 py-2 ">Count</th>
                                        <th className="px-1 py-2 ">Item</th>
                                        <th className="px-1 py-2 ">Quantity in store</th>
                                        <th className="px-1 py-2 ">Reorder level</th>
                                        <th className="px-1 py-2 ">Last updated</th>
                                        <th className="px-1 py-2 ">Issued quantity</th>
                                        <th className="px-1 py-2 ">Received quantity</th>
                                        <th className="px-1 py-2 ">Approval</th>
                                        <th className="px-1 py-2 ">Status</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
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

export default ItemStockRec