import { Mail, Phone, User, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useStore } from '../../store/UpdateStore';
import { useAuthStore } from '../../store/authStore';

const AddMedicalStockModel = ({ onClose }) => {
  const { getMedicine, medicines, potencys, getPotency, addMedicineStock, medicalStockToggleSubmit } = useStore();
  const { user } = useAuthStore();
  const [medicine, setmedicine] = useState();
  const [potency, setpotency] = useState();
  const [quantity, setquantity] = useState();
  useEffect(() => {
    getMedicine();
  }, [getMedicine]);

  useEffect(() => {
    getPotency();
  }, [getPotency]);

  async function handleSubmit(e) {
    e.preventDefault();
    
    await addMedicineStock(medicine, potency, quantity, user?.branch);
    alert("Added Medicine stock");
    setmedicine('');
    setpotency('');
    setquantity('');
    medicalStockToggleSubmit();
  }
  return (
    <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
      <div className="bg-[#e9ecef] max-h-[90vh] max-w-[80vw] overflow-y-auto   flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
        <button
          onClick={onClose}
          className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"
        >
          <X size={24} />
        </button>
        <h1 className="text-blue-500 text-2xl md:text-3xl mb-6 text-center font-semibold">
          Add Medicine to Stock
        </h1>
        <div className="bg-white mx-auto  p-5 rounded-lg w-auto">
          <form onSubmit={handleSubmit} >
            <div className='mb-3'>
              <h1 className="text-black mb-3 text-lg font-semibold">Medicine:</h1>
              <select
                onChange={(e) => setmedicine(e.target.value)}
                value={medicine}
                name="select item"
                id="item-select"
                className="py-2 rounded-lg w-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900"
              >
                <option value="">Select Medicine</option>
                {medicines.map((medicine, index) => (
                  <option key={index}>{medicine?.medicine}</option>
                ))}
              </select>
            </div>
            <div className='mb-3'>
              <h1 className="text-black mb-3 text-lg font-semibold">Unit:</h1>
              <select
                onChange={(e) => setpotency(e.target.value)}
                value={potency}

                name="select item"
                id="item-select"
                className="py-2 rounded-lg w-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900"
              >
                <option value="">Select Potency</option>
                {potencys.map((el, index) => (
                  <option key={index}>{el?.potency}</option>
                ))}
              </select>
            </div>
            <div className='mb-3'>
              <h1 className="text-black mb-2 text-lg font-semibold">Receive quantity:</h1>
              <input type='number' defaultValue={0} onChange={(e) => setquantity(e.target.value)} value={quantity}
                className='w-full  h-10  pl-3 pr-3 py-2 font-normal  rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900 placeholder-zinc-500 transition
            duration-200'
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 w-full transition-all duration-300 cursor-pointer hover:bg-blue-600 py-2 rounded-lg mt-3 text-white"
            >
              Add
            </button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default AddMedicalStockModel