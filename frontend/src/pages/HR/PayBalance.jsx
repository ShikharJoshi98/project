import React, { useEffect, useState } from 'react'
import HRnavbar from '../../components/HR/HRnavbar'
import { recStore } from '../../store/RecStore';
import { useNavigate, useParams } from 'react-router-dom';
import { DOC_API_URL, docStore } from '../../store/DocStore';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';
import { HR_API_URL, useStore } from '../../store/UpdateStore';

const PayBalance = () => {
  const { getPatientDetails, patients } = recStore();
  const { getBalanceDue, balanceDue } = docStore();
  const { branchCourierPayment, getCourierPayment } = useStore();
  const [paymentMode, setPaymentMode] = useState('cash');
  const [amountPaid, setAmountPaid] = useState(0);
  const [transactionDetails, setTransactionDetails] = useState('');
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    getPatientDetails();
    getBalanceDue(id);
    getCourierPayment(user?.branch);
  }, [getPatientDetails, getBalanceDue])
  
  const patient = patients.filter((patient) => patient?._id === id);
  const courier = branchCourierPayment.filter((courier) => courier?.patient?._id === patient[0]?._id)
  console.log(courier);
  const pay = async () => {
    try {
      await axios.post(`${DOC_API_URL}/addBillPayment/${id}`, { billPaid: amountPaid, transactionDetails, modeOfPayment: paymentMode, paymentCollectedBy: user?._id, totalBill: balanceDue.dueBalance, balance_paid_flag: true });
      if (balanceDue?.appointmentType === 'courier') {
        await axios.patch(`${HR_API_URL}/updateCourierStatus/${courier[0]?._id}/${patient[0]?._id}`);
      }
      navigate('/HR-balance');
    } catch (error) {
      console.log(error.message);
    }
  }
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
          <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Balance Payment</h1>
          <div className='bg-white max-w-[410px]  mt-6 py-5 flex flex-col text-sm sm:text-lg gap-2 border-1 border-blue-400 rounded-md shadow-md mx-auto'>
            <div className='flex justify-between px-2 sm:px-5'><p className='font-semibold'>Balance Dues : </p><p>Rs {balanceDue === 'No Balance Field' ? 0 : balanceDue.dueBalance}</p></div>
            <hr className='my-3 h-0.5 w-full border-none bg-blue-500' />
            <div className='flex items-center flex-col  gap-4 mt-4'><p>Mode of Payment : </p><div className='h-10 bg-[#c8c8ce] rounded-[18px]'><button onClick={() => setPaymentMode('cash')} className={`py-1 ${paymentMode === 'cash' ? 'bg-blue-500 rounded-[18px] text-white' : ''} py-1.5 px-5 cursor-pointer`}>Cash</button><button onClick={() => setPaymentMode('online')} className={`py-1.5 px-5 ${paymentMode === 'online' ? 'bg-blue-500 rounded-[18px] text-white' : ''} cursor-pointer`}>Online</button></div></div>
            <div className='flex justify-between items-center px-2 mt-5 sm:px-5'><p className='font-semibold'>Amount Paid : </p><input type="number" onChange={(e) => setAmountPaid(e.target.value)} className='border border-gray-300 pl-2 w-40 focus:outline-none h-10 rounded-md ' /></div>
            {paymentMode === 'online' && <div className='flex justify-between items-center px-2 mt-5 sm:px-5'><p className='font-semibold'>Transaction Details : </p><input onChange={(e) => setTransactionDetails(e.target.value)} className='border border-gray-300 pl-2 w-40 focus:outline-none h-10 rounded-md ' /></div>}
            <button type='button' onClick={() => pay()} className='bg-green-500 text-white font-semibold rounded-lg w-fit py-2 px-8 cursor-pointer mx-auto mt-8'>Done</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PayBalance