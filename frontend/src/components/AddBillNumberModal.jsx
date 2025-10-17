import { RxCross2 } from "react-icons/rx"
import Input from "./Input";
import { IoReceiptSharp } from "react-icons/io5";
import { useState } from "react";
import { HR_API_URL } from "../store/UpdateStore";
import axios from "axios";

const AddBillNumberModal = ({ onClose, orderId, setSubmit, type }) => {
    const [billNumber, setBillNumber] = useState('');

    const handleSumbit = async (e) => {
        e.preventDefault();
        try {
            if (type === 'medicine') {
                await axios.post(`${HR_API_URL}//addMedicalOrderBillNumber/${orderId}`, { billNumber });
            }
            else if (type === 'item') {
                await axios.post(`${HR_API_URL}/addOrderBillNumber/${orderId}`, { billNumber });
            }
            setSubmit(prev => !prev);
            onClose();
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] min-h-[50vh] max-w-[40vw] overflow-y-auto flex flex-col w-full rounded-xl p-6 md:p-6 shadow-lg">
                <button
                    onClick={onClose}
                    className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"
                >
                    <RxCross2 size={24} />
                </button>
                <h1 className="text-blue-500 text-2xl md:text-3xl mb-10 text-center font-semibold">
                    ADD BILL NUMBER
                </h1>
                <form onSubmit={handleSumbit} className="mx-auto">
                    <div className='flex flex-col gap-2 '>
                        <p>Bill Number:</p>
                        <Input icon={IoReceiptSharp} value={billNumber} onChange={(e) => setBillNumber(e.target.value)} type='text' required />
                    </div>
                    <button className='cursor-pointer block mx-auto bg-blue-400 text-lg  font-semibold hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white mt-7 w-52 p-2 rounded-full'>Add</button>
                </form>
            </div>
        </div>
    )
}

export default AddBillNumberModal