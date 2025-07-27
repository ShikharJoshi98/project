import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaMoneyBill } from 'react-icons/fa6'
import Input from '../../components/Input'
import axios from 'axios'
import { DOC_API_URL, docStore } from '../../store/DocStore'
import { FaAngleDoubleLeft, FaPlus } from 'react-icons/fa'
import { updateDate } from '../../store/todayDate'
import ConsultationChargePriceModal from '../../components/Doctor/ConsultationChargePriceModal'
import { CiTrash } from 'react-icons/ci'

const ConsultationCharges = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { getConsultationCharges, consultationCharges } = docStore();
    const [formValues, setFormValues] = useState({type: '', price: ''});
    const [priceModal, setPriceModal] = useState(false);
    const [consultationPrices, setConsultationPrices] = useState([]);
    const [submit, setSubmit] = useState(false);
    const getConsultationPrices = async () => {
        const response = await axios.get(`${DOC_API_URL}/getconsultationChargePrice`);
        setConsultationPrices(response.data.prices)
    }
    let date = updateDate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    }
    useEffect(() => {
        getConsultationCharges(id);
        getConsultationPrices();
    }, [getConsultationCharges, submit])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${DOC_API_URL}/add-consultation-charges/${id}`, formValues);
            setSubmit(prev => !prev);
            setFormValues({
                type: '',
                price: ''
            })
        } catch (error) {
            console.error(error.message);
        }
    }

    const deleteRow = async (id) => {
        try {
            await axios.delete(`${DOC_API_URL}/delete-consultation-charges/${id}`);
            setSubmit(prev => !prev);
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div className="bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 overflow-hidden min-h-screen w-full">
            <div className="bg-[#e9ecef] w-auto relative p-5 mx-10 my-6 rounded-lg">
                <h1 onClick={() => navigate(`/appointment-details/${id}`)} className='text-3xl cursor-pointer ml-10'><FaAngleDoubleLeft /></h1>
                <h1 className='text-xl sm:text-4xl text-center font-semibold mt-10 text-[#337ab7]'>ADD CONSULTATION CHARGES</h1>
                <button type="button" onClick={() => setPriceModal(true)} className="p-2 bg-blue-500 absolute top-10 right-5 flex items-center justify-center gap-2 text-white rounded-md cursor-pointer">Add Charges<FaPlus/></button>
                <form onSubmit={handleSubmit} className=' mt-10'>
                    <div className='sm:grid flex flex-col pl-10 gap-y-5 gap-x-2 grid-cols-2'>
                        <div className='relative'>
                            <h1 className='text-black font-semibold mb-2'>Type:</h1>
                            <Input icon={FaMoneyBill} name='type' value={formValues.type} onChange={e => (handleChange(e))} placeholder='Consultation Charges' />
                        </div>
                        <div>
                            <h1 className='text-black font-semibold mb-2'>Price:</h1>
                            <div className='relative   w-full '>
                                <select name='price' value={formValues.price} onChange={e => (handleChange(e))} required className='py-2 pl-3 bg-white rounded-lg border border-gray-400 w-full' >
                                    <option disabled selected>Select Price</option>
                                    {
                                        consultationPrices.map((price, index) =>
                                            <option key={index} value={price?.price}>{price?.price}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center mt-5'>
                        <button className='bg-blue-500 hover:bg-blue-600 rounded-md text-white p-2'>Submit</button>
                    </div>
                </form>
                <div className="overflow-x-auto p-4 mt-6">
                    <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="py-2 px-4 border">Serial</th>
                                <th className="py-2 px-4 border">Date</th>
                                <th className="py-2 px-4 border">Name</th>
                                <th className="py-2 px-4 border">Price</th>
                                <th className="py-2 px-4 border">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                consultationCharges.map((charge, index) => (
                                    <tr key={index} className='bg-blue-100'>
                                        <td className='py-2 px-4 text-center'>{index + 1}</td>
                                        <td className="py-2 px-4 text-center">{date}</td>
                                        <td className='py-2 px-4 text-center'>{charge?.type}</td>
                                        <td className='py-2 px-4 text-center'>{charge?.price}</td>
                                        <td onClick={() => deleteRow(charge?._id)} className='py-2 px-4 flex items-center justify-center'><CiTrash /></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {priceModal && <ConsultationChargePriceModal setSubmit={setSubmit} onClose={() => setPriceModal(false)} />}
        </div>
    )
}

export default ConsultationCharges