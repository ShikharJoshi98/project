import { useEffect, useState } from 'react'
import Input from '../Input'
import { useStore } from '../../store/UpdateStore';
import BillModal from './BillModal';
import { LuLoaderCircle } from 'react-icons/lu';
import { CiSearch } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import OrderPaymentModal from './OrderPaymentModal';
import { FaCheck } from 'react-icons/fa';

const OrderMedicineHistoryModal = ({ location, onClose }) => {
    const { getMedicalOrders, medicalOrders } = useStore();
    const [billModal, setBillModal] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [orderPaymentModal, setOrderPaymentModal] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [isPayMultiple, setPayMultiple] = useState(false);
    const [isChecked, setChecked] = useState([]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(true);
        }, 200);
        getMedicalOrders(location).finally(() => {
            clearTimeout(timeout);
            setLoading(false);
        });;
    }, [getMedicalOrders, submit]);

    const filteredOrders = medicalOrders.filter(order =>
        order.formRows.some(row =>
            row.vendor.some(v => v.toLowerCase().includes(searchTerm))
        )
    );
    const addBillId = (id) => {
        setChecked((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-h-[90vh] max-w-[90vw] overflow-y-auto   flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
                <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"><RxCross2 size={24} /></button>
                <h1 className="text-blue-500 text-2xl md:text-4xl mb-10 text-center font-semibold">Order History {location}</h1>
                <Input icon={CiSearch} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search by Vendor' />
                {loading ? <LuLoaderCircle className='animate-spin mx-auto mt-10' /> : <div className="overflow-x-auto mt-10 rounded-lg">
                    <div className='flex items-center mb-5 gap-2 justify-center' >
                        {isPayMultiple === false ?
                            <button onClick={() => setPayMultiple(true)} className='text-white font-semibold bg-blue-500 rounded-md py-1 px-3 block cursor-pointer'>Select Multiple Bills</button>
                            :
                            <button className='text-white font-semibold bg-blue-500 rounded-md py-1 px-3 block cursor-pointer' onClick={() => { if (isChecked.length === 0) { alert('No Bills Added') } else { setOrderPaymentModal(true) } }}>Add Selected Bill Details</button>
                        }
                        {isPayMultiple === true && <button onClick={() => { setPayMultiple(false); setChecked([]) }} ><RxCross2 className='text-lg' /></button>}
                    </div>
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
                                <th className="px-2 py-4 ">Add Payment Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order, orderIndex) =>
                                order.formRows.map((row, rowIndex) => (
                                    <tr key={`${orderIndex}-${rowIndex}`} className="bg-blue-200">
                                        {rowIndex === 0 && (
                                            <td rowSpan={order?.formRows.length} className="py-2 px-1 text-center border">
                                                {isPayMultiple ? (order?.order_payment_flag === false ? <button onClick={() => addBillId(order?._id)} className={`rounded-full h-8 w-8 flex items-center mx-auto p-2 ${isChecked.includes(order?._id)
                                                    ? 'bg-blue-500 border-green-600 text-white'
                                                    : 'bg-white border-gray-400 text-gray-600'}`}>{isChecked.includes(order?._id) ? <FaCheck /> : ''}</button> : 'Details Added') : (orderIndex + 1)}
                                            </td>
                                        )}
                                        <td className="py-2 px-1 border">{row?.vendor.join(", ")}</td>
                                        {rowIndex === 0 && <td rowSpan={order?.formRows.length} className="py-2 px-1 border text-center">{row?.order_Delivered_Flag === false ? 'Order Not Delivered' : <button onClick={() => { setBillModal(true); setOrderId(order?._id) }} className="bg-blue-500 text-white mx-auto py-1 cursor-pointer px-2 flex items-center rounded-md gap-1">View</button>}
                                            <p className="text-center mt-4">{`B No. : ${order?.billNumber ? order?.billNumber : '-'}`}</p>
                                        </td>
                                        }

                                        {rowIndex === 0 && (
                                            <td rowSpan={order?.formRows.length} className="py-2 px-1 text-center border">
                                                {order?.orderDate}
                                            </td>
                                        )}
                                        <td className="py-2 px-1 border text-center">{row?.deliveryDate}</td>
                                        <td className="py-2 px-1 border text-center"><span className={`border-1 ${row?.order_Delivered_Flag === true ? 'text-green-500 border-green-500' : 'text-red-500 border-red-500'}  rounded-md py-1 px-2`}>{row?.order_Delivered_Flag === true ? 'Delivered' : 'Pending'}</span></td>
                                        <td className="py-2 px-1 border text-center"><span className={`border-1 ${row?.doctor_Approval_Flag === true ? 'text-green-500 border-green-500' : 'text-red-500 border-red-500'}  rounded-md py-1 px-2`}>{row?.doctor_Approval_Flag === true ? 'Approved' : 'Pending'}</span></td>
                                        {rowIndex === 0 && (<td rowSpan={order?.formRows.length} className={`${order?.order_payment_flag === true ? 'text-green-500' : 'text-red-500'} py-2 px-1 border border-black text-center`}>{order?.order_payment_flag === true ? 'Paid' : 'Unpaid'}</td>)}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>}
            </div>
            {billModal && <BillModal onClose={() => setBillModal(false)} type='medicine' orderId={orderId} />}
            {orderPaymentModal && <OrderPaymentModal setSubmit={setSubmit} type='medicine' onClose={() => setOrderPaymentModal(false)} isChecked={isChecked} />}
        </div>
    )
}

export default OrderMedicineHistoryModal