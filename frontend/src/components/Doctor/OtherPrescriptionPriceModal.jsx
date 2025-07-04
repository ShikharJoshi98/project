import axios from 'axios';
import { IndianRupee, X } from 'lucide-react';
import { DOC_API_URL } from '../../store/DocStore';
import { useState } from 'react';
import Input from '../Input';

const OtherPrescriptionPriceModal = ({ onClose, setSubmit }) => {
    const [price, setPrice] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axios.post(`${DOC_API_URL}/otherPrescriptionPrice`, { price });
            setSubmit(prev => !prev);
            onClose();
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] overflow-x-hidden min-h-[50vh] max-w-[30vw] overflow-y-auto   flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
                <button
                    onClick={() => { onClose() }}
                    className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"
                >
                    <X size={24} />
                </button>
                <h1 className="text-blue-500 text-2xl md:text-3xl mb-10 text-center font-semibold">
                    Add Price
                </h1>
                <form onSubmit={handleSubmit} className="mx-auto">
                    <div className='flex flex-col gap-2 '>
                        <h1>Price</h1>
                        <Input icon={IndianRupee} onChange={(e) => setPrice(e.target.value)} value={price} type='number' required />
                    </div>
                    <button className='cursor-pointer block mx-auto bg-blue-400 text-lg  font-semibold hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white mt-7 w-52 p-2 rounded-full'>Add</button>
                </form>

            </div>
        </div>
    )
}

export default OtherPrescriptionPriceModal