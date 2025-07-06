import { Lock, X } from "lucide-react";
import { useEffect, useState } from "react";
import { recStore } from "../store/RecStore";
import { FaRupeeSign } from "react-icons/fa";
import Input from "./Input";
import axios from "axios";
import { DOC_API_URL } from "../store/DocStore";
import { useAuthStore } from "../store/authStore";
import { HR_API_URL } from "../store/UpdateStore";
import { updateDate } from "../store/todayDate";


const UpdateCourierPayment = ({ payment,setSubmit, onClose }) => {
  const { getPatientDetails, patients } = recStore();
  const { user } = useAuthStore();
  const [amountPaid, setAmountPaid] = useState(0);
  const [transactionDetails, setTransactionDetails] = useState('');
  const todayDate = updateDate();
  useEffect(() => {
    getPatientDetails();
  }, [getPatientDetails]);

  const patient = patients.filter((patient) => patient?._id === payment?.patient?._id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${DOC_API_URL}/addBillPayment/${payment?.patient?._id}`, {
        billPaid: parseInt(amountPaid),
        modeOfPayment: 'online',
        appointmentType: 'courier',
        paymentCollectedBy: user?._id,
        transactionDetails,
        totalBill: (payment?.dueBalance),
        balance_paid_flag: true
      });
      await axios.patch(`${HR_API_URL}/updateCourierStatus/${payment?._id}/${payment?.patient?._id}`, {
        balance_paid_flag: true,
        date:todayDate
      });
      onClose();
      setSubmit(prev => !prev);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
      <div className="bg-[#e9ecef] overflow-x-hidden max-h-[90vh] max-w-[80vw] overflow-y-auto flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
        <button
          onClick={() => { onClose(); }}
          className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"
        >
          <X size={24} />
        </button>
        <h1 className="text-blue-500 text-2xl md:text-3xl text-center font-semibold">{payment?.balance_paid_flag===true?'Payment Details':'Add Payment Details'}</h1>
        <div className='text-stone-800 w-fit text-sm sm:text-xl flex flex-wrap items-center gap-5 font-semibold my-10 bg-[#dae5f4] p-3 rounded-lg'>
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
        {payment?.balance_paid_flag===false?<div><p className="text-2xl p-3 font-semibold">Address : {patient[0]?.address}</p>
        <p className="text-2xl p-3 font-semibold">Balance : {payment?.dueBalance}</p>
        <form className="w-fit mx-auto" onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2 '>
            <h1>Paid Amount</h1>
            <Input icon={FaRupeeSign} type='number' onChange={(e) => setAmountPaid(e.target.value)} placeholder='Enter Amount' required />
          </div>
          <div className='flex flex-col my-5 gap-2 '>
            <h1>Transaction ID</h1>
            <Input icon={Lock} onChange={(e) => setTransactionDetails(e.target.value)} type='text' placeholder='Mention Transaction ID' />
          </div>
          <button type='submit' className='bg-green-500 block text-white font-semibold rounded-lg w-fit py-2 px-8 cursor-pointer mx-auto mt-8'>Add</button>
          </form></div> :
          <div className="mx-auto">
            <p className="text-2xl p-3 font-semibold">Address : {patient[0]?.address}</p>
            <p className="text-2xl p-3 font-semibold">Courier Date. : {payment?.date}</p>
            <p className="text-2xl p-3 font-semibold">Payment Date. : {payment?.receiveDate}</p>
            <p className="text-2xl p-3 font-semibold">Balance Amount : {payment?.dueBalance}</p>
            <p className="text-2xl p-3 font-semibold">Transaction ID : {payment?.transactionDetails}</p>
            <p className="text-2xl p-3 font-semibold">Payment Collected By : {payment?.paymentCollectedBy?.fullname}</p>
           </div>
        }
      </div>
    </div>
  )
}

export default UpdateCourierPayment