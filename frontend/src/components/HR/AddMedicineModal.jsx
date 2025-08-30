import { useEffect, useState } from 'react'
import { useStore } from '../../store/UpdateStore';
import Input from '../Input';
import { FaPlus } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';

const AddMedicineModal = ({ onClose }) => {
  const { getMedicine, medicines, potencys, getPotency, AddMedicine, AddPotency } = useStore();
  const [NewMedicine, setmedicine] = useState("");
  const [NewPotency, setpotency] = useState("");
  const [searchmedicineTerm, setSearchmedicineTerm] = useState("");
  const [searchpotencyTerm, setSearchpotencyTerm] = useState("");
  const [submit, setSubmit] = useState(false);
  const filteredMedicine = medicines.filter(medicine =>
    medicine.medicine.toLowerCase().includes(searchmedicineTerm.toLowerCase())
  );
  const filteredPotencys = potencys.filter(potency =>
    potency.potency.toLowerCase().includes(searchpotencyTerm.toLowerCase())
  );
  useEffect(() => {
    getMedicine();
  }, [getMedicine, submit]);

  useEffect(() => {
    getPotency();
  }, [getPotency, submit]);

  async function addMedicine(e) {
    e.preventDefault();
    try {
      await AddMedicine(NewMedicine);
      setmedicine("");
      alert("Medicine added");
      setSubmit(prev => !prev);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function addpotency(e) {
    e.preventDefault();
    try {
      await AddPotency(NewPotency);
      setpotency("");
      alert("Potency added");
      setSubmit(prev => !prev);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
      <div className="bg-[#e9ecef] max-h-[90vh] overflow-y-auto   flex flex-col w-full max-w-2xl rounded-xl p-6 md:p-10 shadow-lg">
        <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"><RxCross2 size={24} /></button>
        <h1 className="text-blue-500 text-2xl md:text-3xl mb-6 text-center font-semibold">Add Medicine/Potency List</h1>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-white p-5 rounded-lg w-full">
            <form onSubmit={addMedicine}>
              <h1 className="text-black mb-3 text-lg font-semibold">Medicine Name</h1>
              <Input onChange={(e) => setmedicine(e.target.value)} value={NewMedicine} icon={FaPlus} type="text" placeholder="Mention Medicine Name" />
              <button type="submit" className="bg-blue-500 w-full transition-all duration-300 cursor-pointer hover:bg-blue-600 py-2 rounded-lg mt-3 text-white">Add</button>
            </form>
          </div>
          <div className="bg-white p-5 rounded-lg w-full">
            <form onSubmit={addpotency}>
              <h1 className="text-black mb-3 text-lg font-semibold">Potency Name</h1>
              <Input onChange={(e) => setpotency(e.target.value)} value={NewPotency} icon={FaPlus} type="text" placeholder="Mention Potency Name" />
              <button type="submit" className="bg-blue-500 w-full transition-all duration-300 cursor-pointer hover:bg-blue-600 py-2 rounded-lg mt-3 text-white">Add</button>
            </form>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <div className="bg-white p-5 rounded-lg w-full">
            <h1 className="text-black mb-3 text-lg font-semibold">Medicine List (Search Here)</h1>
            <select value={searchmedicineTerm} onChange={(e) => setSearchmedicineTerm(e.target.value)} name="select medicine" id="medicine-select" className="py-2 rounded-lg w-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900">
              <option value="">Select Medicines</option>
              {medicines.map((medicine, index) => (
                <option key={index}>{medicine?.medicine}</option>
              ))}
            </select>
          </div>
          <div className="bg-white p-5 rounded-lg w-full">
            <h1 className="text-black mb-3 text-lg font-semibold">Potency List (Search Here)</h1>
            <select value={searchpotencyTerm} onChange={(e) => setSearchpotencyTerm(e.target.value)} name="select potency" id="potency-select" className="py-2 rounded-lg w-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900">
              <option value="">Select Potencys</option>
              {potencys.map((el, index) => (
                <option key={index}>{el?.potency}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex mt-6 gap-6">
          <div className="overflow-x-auto max-h-60 w-full">
            <table className="min-w-full border  border-gray-300 rounded-lg shadow-md">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Medicine Name</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredMedicine.map((medicine, index) => (
                    <tr key={index} className="border-b bg-gray-300 border-gray-500">
                      <td className="px-4 py-2">{medicine?.medicine}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto  max-h-60 w-full">
            <table className="min-w-full border  border-gray-300 rounded-lg shadow-md">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Potency Name</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredPotencys.map((potency, index) => (
                    <tr key={index} className="border-b bg-gray-300 border-gray-500">
                      <td className="px-4 py-2">{potency?.potency}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddMedicineModal