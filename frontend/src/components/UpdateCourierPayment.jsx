import { useEffect, useState } from "react";
import { recStore } from "../store/RecStore";
import { FaLock, FaRupeeSign } from "react-icons/fa";
import Input from "./Input";
import axios from "axios";
import { DOC_API_URL } from "../store/DocStore";
import { useAuthStore } from "../store/authStore";
import { HR_API_URL } from "../store/UpdateStore";
import { updateDate } from "../store/todayDate";
import { RxCross2 } from "react-icons/rx";
import { LuLoaderCircle } from "react-icons/lu";


const UpdateCourierPayment = ({ payment, setSubmit, onClose }) => {
  const { getPatient, patient, getShift, isShift, shiftToggle } = recStore();
  const { user } = useAuthStore();
  const [amountPaid, setAmountPaid] = useState(0);
  const [transactionDetails, setTransactionDetails] = useState('');
  const todayDate = updateDate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchShiftAndAppointments = async () => {
      await getShift(user?.role, user?._id);
    };
    if (user?._id) fetchShiftAndAppointments();
  }, [shiftToggle, recStore.getState().isShift?.shift])

  useEffect(() => {
    getPatient(payment?.patient?._id);
  }, [getPatient]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${DOC_API_URL}/addBillPayment/${payment?.patient?._id}`, {
        billPaid: parseInt(amountPaid),
        modeOfPayment: 'online',
        appointmentType: 'courier',
        paymentCollectedBy: user?._id,
        transactionDetails,
        totalBill: (payment?.dueBalance),
        balance_paid_flag: true,
        shift: isShift?.shift
      });
      await axios.patch(`${HR_API_URL}/makeDeliveryPayment/${payment?._id}/${payment?.patient?._id}`, {
        billPaid: parseInt(amountPaid),
        totalBill: (payment?.dueBalance),
        modeOfPayment: 'online',
        transactionDetails,
        paymentCollectedBy: user?._id,
        courier_Received_Payment: true
      });
      await axios.patch(`${HR_API_URL}/updateCourierStatus/${payment?._id}/${payment?.patient?._id}`, {
        balance_paid_flag: true,
        date: todayDate
      });
      onClose();
      setLoading(false);
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
          <RxCross2 size={24} />
        </button>
        <h1 className="text-blue-500 text-2xl md:text-3xl text-center font-semibold">{payment?.balance_paid_flag === true ? 'Payment Details' : 'Add Payment Details'}</h1>
        <div className='text-stone-800 w-fit text-sm sm:text-xl flex flex-wrap items-center gap-5 font-semibold my-10 bg-[#dae5f4] p-3 rounded-lg'>
          <h1>{patient?.fullname} </h1>
          <p className='text-blue-400'>|</p>
          <div className='flex items-center gap-2'>
            <h1>Contact No. -</h1>
            <h1>{patient?.phone}</h1>
          </div>
          <p className='text-blue-400'>|</p>
          <div className='flex items-center gap-2'>
            <h1>Case Paper No. -</h1>
            <h1>{patient?.casePaperNo}</h1>
          </div>
        </div>
        {payment?.balance_paid_flag === false ? <div><p className="text-2xl p-3 font-semibold">Address : {patient?.address}</p>
          <p className="text-2xl p-3 font-semibold">Balance : {payment?.dueBalance}</p>
          <form className="w-fit mx-auto" onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2 '>
              <h1>Paid Amount</h1>
              <Input icon={FaRupeeSign} type='number' onChange={(e) => setAmountPaid(e.target.value)} placeholder='Enter Amount' required />
            </div>
            <div className='flex flex-col my-5 gap-2 '>
              <h1>Transaction ID</h1>
              <Input icon={FaLock} onChange={(e) => setTransactionDetails(e.target.value)} type='text' placeholder='Mention Transaction ID' />
            </div>
            <button type='submit' className='bg-green-500 block text-white font-semibold rounded-lg w-fit py-2 px-8 cursor-pointer mx-auto mt-8'>{loading ? <LuLoaderCircle className="mx-auto" size={24} /> : 'Add'}</button>
          </form></div> :
          <div className="mx-auto">
            <p className="text-2xl p-3 font-semibold">Address : {patient?.address}</p>
            <p className="text-2xl p-3 font-semibold">Courier Date. : {payment?.date}</p>
            <p className="text-2xl p-3 font-semibold">Payment Date. : {payment?.receiveDate}</p>
            <p className="text-2xl p-3 font-semibold">Balance Amount : {payment?.dueBalance}</p>
            <p className="text-2xl p-3 font-semibold">Transaction ID : {payment?.transactionDetails}</p>
            <p className="text-2xl p-3 font-semibold">Payment Collected By : {payment?.paymentCollectedBy?.username}</p>
          </div>
        }
      </div>
    </div>
  )
}

export default UpdateCourierPayment