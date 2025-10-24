import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx';
import { IoWalletOutline } from "react-icons/io5";
import Input from '../Input';
import { LuLoaderCircle, LuReceipt } from 'react-icons/lu';
import { RiBillFill } from "react-icons/ri";
import { FaRupeeSign } from 'react-icons/fa';
import { CiBank } from 'react-icons/ci';
import axios from 'axios';
import { DOC_API_URL, docStore } from '../../store/DocStore';
import { updateDate } from '../../store/todayDate';
import { useStore } from '../../store/UpdateStore';
import BillModal from './BillModal';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const OrderPaymentModal = ({ setSubmit, type, onClose, isChecked = [] }) => {
    const { getBillNumbers, ordersBillNumber, getMedicalBillNumbers, medicalOrderBillNumbers } = docStore();
    const { user } = useAuthStore();
    const { getOrder, Orders, orderBillAmount, getMedicalOrder } = useStore();
    const { location } = useParams();
    const [formValues, setFormValues] = useState({
        transactionDetails: '',
        chequeNo: '',
        date: '',
        billNo: '',
        totalBill: '',
        amountPaid: '',
        modeOfPayment: '',
        bills: ''
    });
    const [loading, setLoading] = useState(false);
    const [billModal, setBillModal] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [billAmount, setBillAmount] = useState('');
    useEffect(() => {
        setFormValues((prev) => ({
            ...prev,
            billNo: isChecked,
            totalBill: orderBillAmount || '',
            bills: ordersBillNumber?.length ? ordersBillNumber : medicalOrderBillNumbers
        }));
    }, [isChecked, orderBillAmount, ordersBillNumber, medicalOrderBillNumbers]);


    useEffect(() => {
        if (type === 'item') {
            getBillNumbers(isChecked);
            getOrder(isChecked);
        } else if (type === 'medicine') {
            getMedicalBillNumbers(isChecked);
            getMedicalOrder(isChecked);
        }
    }, [isChecked, type]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            if (type === 'item') {
                const response = await axios.post(`${DOC_API_URL}/addPaymentDetails`, { ...formValues, branch: location, phone: user?.phone });
            }
            else if (type === 'medicine') {
                const response = await axios.post(`${DOC_API_URL}/addMedicalPaymentDetails`, { ...formValues, branch: location, phone: user?.phone });
            }
            setSubmit(prev => !prev);
            setFormValues({
                transactionDetails: '',
                chequeNo: '',
                date: '',
                billNo: '',
                totalBill: '',
                amountPaid: '',
                modeOfPayment: ''
            });
            setLoading(false);
            onClose();
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-h-[90vh] max-w-[99vw] overflow-y-auto flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
                <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"><RxCross2 size={24} /></button>
                <h1 className="text-blue-500 text-2xl md:text-4xl mb-10 text-center font-semibold">Add Order Payment Details</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-2'>
                        <h1>Transaction Details</h1>
                        <Input icon={IoWalletOutline} onChange={handleInputChange} value={formValues.transactionDetails} name="transactionDetails" placeholder='Add Transaction Details' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Cheque No.</h1>
                        <Input icon={LuReceipt} onChange={handleInputChange} value={formValues.chequeNo} name="chequeNo" placeholder='Add Cheque No.' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Date of Payment</h1>
                        <Input icon={LuReceipt} onChange={handleInputChange} value={formValues.date} name="date" type="date" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Bill Details</h1>
                        <ul className='list-disc ml-10'>
                            {
                                type === 'item' ? Orders?.map((order, index) => (
                                    <li className='flex items-center gap-3 mt-3' key={index}><p>{index + 1}.</p><p>Bill No: {order?.billNumber}</p> <p>Bill Amount: {order?.billAmount}</p> <button type='button' onClick={() => { setBillModal(true); setOrderId(order?._id); setBillAmount(order?.billAmount) }} className='bg-blue-500 rounded-md py-1 px-2 text-white cursor-pointer'>View Bill</button></li>
                                )) :
                                    Orders?.map((order, index) => (
                                        <li className='flex items-center gap-3 mt-3' key={index}><p>{index + 1}.</p><p>Bill No: {order?.billNumber ?? 'Not Added'}</p> <p>Bill Amount: {order?.billAmount ?? 'Not Added'}</p> <button type='button' onClick={() => { setBillModal(true); setOrderId(order?._id); setBillAmount(order?.billAmount) }} className='bg-blue-500 rounded-md py-1 px-2 text-white cursor-pointer'>View Bill</button></li>))
                            }
                        </ul>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Total Bill Amount</h1>
                        <p className='ml-10'>Rs. {orderBillAmount}</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Amount Paid</h1>
                        <Input icon={FaRupeeSign} onChange={handleInputChange} value={formValues.amountPaid} name="amountPaid" placeholder='Add Amount Paid' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Mode of Payment</h1>
                        <Input icon={CiBank} onChange={handleInputChange} value={formValues.modeOfPayment} name="modeOfPayment" placeholder='Enter Mode of Payment' />
                    </div>
                    <button className='mx-auto bg-blue-500 text-white py-1 px-3 rounded-md text-lg mt-6'>{loading ? <LuLoaderCircle className='mx-auto animate-spin' size={24} /> : 'Add'}</button>
                </form>
            </div>
            {billModal && <BillModal onClose={() => setBillModal(false)} type={type} orderId={orderId} amount={billAmount} />}
        </div>
    )
}

export default OrderPaymentModal