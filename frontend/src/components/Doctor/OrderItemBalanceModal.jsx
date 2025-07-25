import { useEffect, useState } from 'react'
import Input from '../Input'
import { useStore } from '../../store/UpdateStore';
import { RxCross2 } from 'react-icons/rx';
import { CiSearch } from 'react-icons/ci';
import { LuLoaderCircle } from 'react-icons/lu';

const OrderItemBalanceModal = ({ location, onClose }) => {
    const { getOrders, ordersPlaced } = useStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(true), 200);
        getOrders(location).finally(() => {
            clearTimeout(timeout);
            setLoading(false);
        })
    }, [getOrders])

    const filteredOrders = ordersPlaced.filter(order =>
    order.formRows.some(row =>
        row.vendor.some(v => v.toLowerCase().includes(searchTerm.toLowerCase())) ||
        row.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    )
);
    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-h-[90vh] max-w-[90vw] overflow-y-auto   flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
                <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"><RxCross2 size={24} /></button>
                <h1 className="text-blue-500 text-2xl md:text-4xl mb-6 text-center font-semibold">Order Balances {location}</h1>
                <div className='flex items-center justify-center gap-2 mt-10'>
                    <Input icon={CiSearch} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search by Vendor or Order Item' />
                </div>
                {loading?<LuLoaderCircle className='animate-spin mx-auto mt-10'/>:<div className="overflow-x-auto mt-10 rounded-lg">
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
                            {filteredOrders.map((order, orderIndex) =>
                                order.formRows.map((row, rowIndex) => (
                                    <tr key={`${orderIndex}-${rowIndex}`} className="bg-blue-200">
                                        {rowIndex === 0 && (
                                            <td rowSpan={order?.formRows.length} className="py-2 px-1 text-center border">
                                                {orderIndex + 1}
                                            </td>
                                        )}
                                        <td className="py-2 px-1 border">{row?.vendor.join(", ")}</td>
                                        <td className="py-2 px-1 text-center border">{row?.itemName}</td>
                                         {rowIndex === 0 && (<td rowSpan={order?.formRows.length} className="py-2 px-1 text-center border">{order?.orderDate}</td>)}
                                        <td className="py-2 px-1 border text-center">{row?.received_date}</td>
                                        <td className="py-2 px-1 text-center border">{row?.quantity}</td>
                                        <td className="py-2 px-1 text-center border">{row?.receivedQuantity}</td>
                                        <td className="py-2 px-1 text-center border">{row?.quantity - row?.receivedQuantity}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>}
            </div>
        </div>
    )
}

export default OrderItemBalanceModal