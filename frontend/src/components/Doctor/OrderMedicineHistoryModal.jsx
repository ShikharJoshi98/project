import { Search, X } from 'lucide-react'
import React from 'react'
import Input from '../Input'

const OrderMedicineHistoryModal = ({ location, onClose }) => {
    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-h-[90vh] max-w-[90vw] overflow-y-auto   flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
                <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"><X size={24} /></button>
                <h1 className="text-blue-500 text-2xl md:text-4xl mb-10 text-center font-semibold">Order History {location}</h1>
                <Input icon={Search} placeholder='Search by Vendor' />
                <div className="overflow-x-auto mt-10 rounded-lg">
                    <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                        <thead className="bg-[#337ab7]  text-white">
                            <tr >
                                <th className="px-2 py-4 ">Serial No.</th>
                                <th className="px-2 py-4 ">Vendor</th>
                                <th className="px-2 py-4 ">Bill Detail</th>
                                <th className="px-2 py-4 ">Order Date</th>
                                <th className="px-2 py-4 ">Expected Delivery Date</th>
                                <th className="px-2 py-4 ">Order Status</th>
                                <th className="px-2 py-4 ">Doctor's Approval</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default OrderMedicineHistoryModal