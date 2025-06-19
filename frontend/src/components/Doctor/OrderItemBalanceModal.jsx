import { Search, SearchIcon, X } from 'lucide-react'
import React, { useEffect } from 'react'
import Input from '../Input'
import { useStore } from '../../store/UpdateStore';

const OrderItemBalanceModal = ({ location, onClose }) => {
    const { getOrders, ordersPlaced } = useStore();
    useEffect(() => {
        getOrders(location);
    }, [getOrders])
    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-h-[90vh] max-w-[90vw] overflow-y-auto   flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
                <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"><X size={24} /></button>
                <h1 className="text-blue-500 text-2xl md:text-4xl mb-6 text-center font-semibold">Order Balances {location}</h1>
                <div className='flex items-center justify-center gap-2 mt-10'>
                    <Input icon={SearchIcon} placeholder='Search by Vendor or Order Item' />
                </div>
                <div className="overflow-x-auto mt-10 rounded-lg">
                    <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                        <thead className="bg-[#337ab7]  text-white">
                            <tr>
                                <th className="px-2 py-4 ">Serial No.</th>
                                <th className="px-2 py-4 ">Vendor</th>
                                <th className="px-2 py-4 ">Order Item</th>
                                <th className="px-2 py-4 ">Order Date</th>
                                <th className="px-2 py-4 ">Receive Date</th>
                                <th className="px-2 py-4 ">Order Quantity</th>
                                <th className="px-2 py-4 ">Received Quantity</th>
                                <th className="px-2 py-4 ">Order Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersPlaced.map((order, orderIndex) =>
                                order.formRows.map((row, rowIndex) => (
                                    <tr key={`${orderIndex}-${rowIndex}`} className="bg-blue-200">
                                        {rowIndex === 0 && (
                                            <td rowSpan={order?.formRows.length} className="py-2 px-1 text-center border">
                                                {orderIndex + 1}
                                            </td>
                                        )}
                                        <td className="py-2 px-1 border">{row?.vendor.join(", ")}</td>
                                        <td className="py-2 px-1 text-center border">{row?.itemName}</td>
                                        <td className="py-2 px-1 text-center border">{order?.orderDate}</td>
                                        <td className="py-2 px-1 border text-center">{row?.deliveryDate}</td>
                                        <td className="py-2 px-1 text-center border">{row?.quantity}</td>
                                        <td className="py-2 px-1 text-center border">{row?.receivedQuantity}</td>
                                        <td className="py-2 px-1 text-center border">{row?.quantity - row?.receivedQuantity}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default OrderItemBalanceModal