import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CiMedicalClipboard } from 'react-icons/ci'
import { useStore } from '../../store/UpdateStore'
import { LuLoaderCircle } from 'react-icons/lu'

const BalanceList = () => {
    const [loading, setLoading] = useState(false);
    const location = useParams();
    const { getAllCollection, branchCollection } = useStore();
    const [selectAppointmentType, setSelectAppointmentType] = useState('All');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await getAllCollection(location.location);
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [getAllCollection]);

    return (
        <div className='bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden'>
            <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
                <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Balance List {location.location}</h1>
                <div className='flex items-center gap-5 mt-10'>
                    <h1 className='text-xl'>Select Appointment Type </h1>
                    <div className='relative'>
                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                            <CiMedicalClipboard className="size-4 text-blue-500" />
                        </div>
                        <select onChange={(e) => setSelectAppointmentType(e.target.value)} name="appointment" required id="appontmentType" className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
                            <option value="All">All</option>
                            <option value="general">General</option>
                            <option value="repeat">Repeat Medicine</option>
                            <option value="courier">Courier Medicine</option>
                        </select>
                    </div>
                </div>
                {loading ? <LuLoaderCircle className='mx-auto animate-spin mt-10 text-gray-500' size={44} /> : <div className="overflow-x-auto mt-10 rounded-lg">
                    <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                        <thead className="bg-[#337ab7]  text-white">
                            <tr >
                                <th className="px-2 py-4 ">Count</th>
                                <th className="px-2 py-4 ">Patient Name</th>
                                <th className="px-4 py-4 ">Patient Case Paper</th>
                                <th className="px-2 py-4 ">Contact No.</th>
                                <th className="px-2 py-4 ">Appointment Type</th>
                                <th className="px-2 py-4 ">Date</th>
                                <th className="px-2 py-4 ">Balance Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                branchCollection.filter(item => item?.dueBalance !== 0 && (selectAppointmentType === 'All' || item?.appointmentType === selectAppointmentType))
                                    .map((item, index) => {
                                        return <tr key={index} className='bg-blue-200'>
                                            <td className='px-1 text-center py-2'>{index + 1}</td>
                                            <td className='px-1 text-center py-2'>{item?.patient?.fullname}</td>
                                            <td className='px-1 text-center py-2'>{item?.patient?.casePaperNo}</td>
                                            <td className='px-1 text-center py-2'>{item?.patient?.phone}</td>
                                            <td className='px-1 text-center py-2'>{item?.appointmentType === 'general' ? 'General' : item?.appointmentType === 'repeat' ? 'Repeat Medicine' : item?.appointmentType === 'courier' ? 'Courier Medicine' : ''}</td>
                                            <td className='px-1 text-center py-2'>{item?.date}</td>
                                            <td className='px-1 text-center py-2'>{item?.dueBalance}</td>
                                        </tr>
                                    })
                            }
                        </tbody>
                    </table>
                </div>}
                {branchCollection.length === 0 && loading === false ? <p className='text-center mt-10 text-lg'>No Data</p> : ''}
            </div>
        </div>
    )
}

export default BalanceList