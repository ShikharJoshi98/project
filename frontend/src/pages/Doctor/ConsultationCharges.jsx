import React from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import AppointmentSidebar from '../../components/Doctor/AppointmentSidebar'
import { FaAngleDoubleLeft } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { FaMoneyBill } from 'react-icons/fa6'
import Input from '../../components/Input'

const ConsultationCharges = () => {
    const navigate = useNavigate();
    const location = useParams();

    const handleSubmit = () => {

    }

    return (
        <div>
            <Docnavbar />
            <div className="flex">
                <AppointmentSidebar />
                <div className="bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full overflow-hidden">
                    <div className="bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg">
                        <h1 onClick={() => navigate(`/appointment-details/${location.id}`)} className='text-3xl cursor-pointer ml-10'><FaAngleDoubleLeft /></h1>
                        <h1 className='text-xl sm:text-3xl md:text-5xl text-center font-semibold mt-10 text-[#337ab7]'>
                            ADD CONSULTATION CHARGES
                        </h1>

                        <form onSubmit={handleSubmit} className=' mt-10'>
                            <div className='sm:grid flex flex-col pl-10 gap-y-5 gap-x-2 grid-cols-2'>
                                <div className='relative'>
                                    <h1 className='text-black font-semibold mb-2'>Type:</h1>
                                    <Input icon={FaMoneyBill} placeholder='Consultation Charges' name='medicine' />
                                </div>
                                <div>
                                    <h1 className='text-black font-semibold mb-2'>Price:</h1>
                                    <div className='relative   w-full '>
                                        <select name="Price" required className='py-2 pl-3 bg-white rounded-lg border border-gray-400 w-full' >
                                            <option value="">Select Price</option>
                                            <option value="100">100</option>
                                            <option value="200">200</option>
                                            <option value="300">300</option>
                                            <option value="400">400</option>
                                            <option value="500">500</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center mt-5'>
                                <button className='bg-blue-500 text-lg hover:bg-blue-600 rounded-md text-white p-2'>Submit</button>
                            </div>
                        </form>
                        <div className="overflow-x-auto p-4 mt-6">
                            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                                <thead>
                                    <tr className="text-lg bg-blue-500 text-white">
                                        <th className="py-2 px-4 border">Serial</th>
                                        <th className="py-2 px-4 border">Name</th>
                                        <th className="py-2 px-4 border">Price</th>
                                        <th className="py-2 px-4 border">Delete</th>                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConsultationCharges