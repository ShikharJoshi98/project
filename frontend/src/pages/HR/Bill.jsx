import React, { useEffect, useState } from 'react'
import HRnavbar from '../../components/HR/HRnavbar'
import { recStore } from '../../store/RecStore'
import { useParams } from 'react-router-dom';
import { docStore } from '../../store/DocStore';

const Bill = () => {
    const { getPatientDetails, patients } = recStore();
    const { prescriptionSubmit, fetchPrescription, prescription, getBillInfo, billInfo,totalBill,getTotalBill } = docStore();
    const [paymentMode, setPaymentMode] = useState('cash');
    const { id } = useParams();
    const [balance, setBalance] = useState(0);
    useEffect(() => {
        getPatientDetails();
        fetchPrescription(id);
        getBillInfo(id);
        getTotalBill(id);
        if(totalBill?.balanceDue){
        setBalance(totalBill?.balanceDue);}
    }, [getPatientDetails, fetchPrescription, prescriptionSubmit,getTotalBill]);
    const patient = patients.filter((patient) => patient?._id === id);
    const addDays = (dateStr, days) => {
        if (!dateStr || !days) return '';
        days = parseInt(days, 10);
        let [day, month, year] = dateStr.split("-").map(Number);
        let date = new Date(year, month - 1, day);
        date.setDate(date.getDate() + days);
        let newDay = String(date.getDate()).padStart(2, '0');
        let newMonth = String(date.getMonth() + 1).padStart(2, '0');
        let newYear = date.getFullYear();
        return `${newDay}-${newMonth}-${newYear}`;
    };
    console.log(totalBill)
    return (
        <div>
            <HRnavbar />
            <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden'>
                <div className='text-stone-800 w-fit text-sm sm:text-xl flex flex-wrap items-center gap-5 font-semibold m-10 bg-[#dae5f4] p-3 md:p-5 rounded-lg'>
                    <h1>{patient[0]?.fullname} </h1>
                    <p className='text-blue-400'>|</p>
                    <div className='flex items-center gap-2'>
                        <h1>Contact No. -</h1>
                        <h1>{patient[0]?.phone}</h1>
                    </div>
                    <p className='text-blue-400'>|</p>
                    <div className='flex items-center gap-2'>
                        <h1>Case Paper No. -</h1>
                        <h1>{patient[0]?.casePaperNo}</h1>
                    </div>
                </div>
                <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
                    <div className='flex flex-col sm:flex-row items-center sm:justify-between'>
                        <p className='flex items-center gap-2 text-2xl'><span className='font-semibold'>Today:</span><span>{prescription[0]?.prescription_date}</span></p>
                        <p className='flex items-center gap-2 text-2xl'><span className='font-semibold'>Next Visit:</span><span>{addDays((prescription[0]?.prescription_date), (prescription[0]?.duration))}</span></p>
                    </div>
                    <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Payment</h1>
                    <div className='bg-white max-w-[410px]  mt-6 py-5 flex flex-col text-sm sm:text-lg gap-2 border-1 border-blue-400 rounded-md shadow-md mx-auto'>
                        <div className='flex justify-between px-2 sm:px-5'><p className='font-semibold'>Medicine Charges : </p><p>Rs {billInfo?.medicineCharges}</p></div>
                        <div className='flex justify-between px-2 sm:px-5'><p className='font-semibold'>Consultation Charges : </p><p>Rs {billInfo?.consultation}</p></div>
                        <div className='flex justify-between px-2 sm:px-5'><p className='font-semibold'>Other Medicine : </p><p>Rs {billInfo?.otherPrescriptionPrice}</p></div>
                        <div className='flex justify-between px-2 sm:px-5'><p className='font-semibold'>Total Amount : </p><p>Rs {billInfo?.medicineCharges + billInfo?.consultation + billInfo?.otherPrescriptionPrice}</p></div>
                        <div className='flex justify-between px-2 sm:px-5'><p className='font-semibold'>Balance Dues : </p><p>Rs {balance}</p></div>
                        <hr className='my-3 h-0.5 w-full border-none bg-blue-500' />
                        <div className='flex justify-between px-2 sm:px-5'><p className='font-semibold text-lg sm:text-2xl'>Amount to be Paid : </p><p className='text-lg sm:text-2xl'>Rs {billInfo?.medicineCharges + billInfo?.consultation + billInfo?.otherPrescriptionPrice + balance}</p></div>
                        <div className='flex items-center flex-col  gap-4 mt-4'><p>Mode of Payment : </p><div className='h-10 bg-[#c8c8ce] rounded-[18px]'><button onClick={() => setPaymentMode('cash')} className={`py-1 ${paymentMode === 'cash' ? 'bg-blue-500 rounded-[18px] text-white' : ''} py-1.5 px-5 cursor-pointer`}>Cash</button><button onClick={() => setPaymentMode('online')} className={`py-1.5 px-5 ${paymentMode === 'online' ? 'bg-blue-500 rounded-[18px] text-white' : ''} cursor-pointer`}>Online</button></div></div>
                        <div className='flex justify-between items-center px-2 mt-5 sm:px-5'><p className='font-semibold'>Amount Paid : </p><input type="number" className='border border-gray-300 pl-2 w-40 focus:outline-none h-10 rounded-md ' /></div>
                        <button className='bg-green-500 text-white font-semibold rounded-lg w-fit py-2 px-8 cursor-pointer mx-auto mt-8'>Done</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bill