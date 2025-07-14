import { useEffect, useState } from 'react'
import Input from '../Input'
import { useStore } from '../../store/UpdateStore'
import BillModal from './BillModal'
import { RxCross2 } from 'react-icons/rx'
import { CiSearch } from 'react-icons/ci'

const OrderItemHistoryModal = ({ location, onClose }) => {
    const { getOrders, ordersPlaced } = useStore();
    const [billModal, setBillModal] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getOrders(location);
    }, [getOrders]);

    const filteredOrders = ordersPlaced.filter(order =>
        order.formRows.some(row =>
            row.vendor.some(v => v.toLowerCase().includes(searchTerm))
        )
    );

    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-h-[90vh] max-w-[90vw] overflow-y-auto   flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
                <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"><RxCross2 size={24} /></button>
                <h1 className="text-blue-500 text-2xl md:text-4xl mb-10 text-center font-semibold">Order History {location}</h1>
                <Input icon={CiSearch} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search by Vendor' />
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
                                        {rowIndex === 0 && <td rowSpan={order?.formRows.length} className="py-2 px-1 border text-center">{row?.order_Delivered_Flag === false ? 'Order Not Delivered' : <button onClick={() => { setBillModal(true); setOrderId(order?._id) }} className="bg-blue-500 text-white mx-auto py-1 cursor-pointer px-2 flex items-center rounded-md gap-1">View</button>}</td>
                                        }

                                        {rowIndex === 0 && (
                                            <td rowSpan={order?.formRows.length} className="py-2 px-1 text-center border">
                                                {order?.orderDate}
                                            </td>
                                        )}
                                        <td className="py-2 px-1 border text-center">{row?.deliveryDate}</td>
                                        <td className="py-2 px-1 border text-center"><span className={`border-1 ${row?.order_Delivered_Flag === true ? 'text-green-500 border-green-500' : 'text-red-500 border-red-500'}  rounded-md py-1 px-2`}>{row?.order_Delivered_Flag === true ? 'Delivered' : 'Pending'}</span></td>
                                        <td className="py-2 px-1 border text-center"><span className={`border-1 ${row?.doctor_Approval_Flag === true ? 'text-green-500 border-green-500' : 'text-red-500 border-red-500'}  rounded-md py-1 px-2`}>{row?.doctor_Approval_Flag === true ? 'Approved' : 'Pending'}</span></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {billModal && <BillModal onClose={() => setBillModal(false)} orderId={orderId} />}
        </div>
    )
}

export default OrderItemHistoryModal