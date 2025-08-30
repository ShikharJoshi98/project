import { useEffect, useState } from 'react'
import Input from '../../components/Input'
import { useStore } from '../../store/UpdateStore'
import { useAuthStore } from '../../store/authStore'
import { useNavigate } from 'react-router-dom'
import { CiSearch } from 'react-icons/ci'

const BalanceHistory = () => {
    const { getCollection, branchCollection } = useStore();
    const { user } = useAuthStore();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        getCollection(user?.branch);
    }, [getCollection]);
    const collectionList = branchCollection.filter((item) => (item?.patient?.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) || item?.patient?.casePaperNo?.toLowerCase().includes(searchTerm.toLowerCase()) || item?.patient?.phone?.toLowerCase().includes(searchTerm.toLowerCase())));
    const lastItem = collectionList[collectionList.length - 1];
    
    return (
        <div className='bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen p-8 w-full overflow-hidden'>
            <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
                <h1 className='p-4 text-center font-semibold mb-6 text-[#337ab7] text-xl sm:text-4xl'>Balance History Details</h1>
                    <Input icon={CiSearch} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search Case PaperNo./ Mobile Number / Patient&apos;s Name' />
                <div className="overflow-x-auto mt-10 rounded-lg">
                    <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                        <thead className="bg-[#337ab7] whitespace-nowrap text-white">
                            <tr>
                                <th className="px-1 py-2">Case Paper No.</th>
                                <th className="px-1 py-2">Name</th>
                                <th className="px-1 py-2">Contact</th>
                                <th className="px-1 py-2">Last Appointment</th>
                                <th className="px-1 py-2">Appointment Type</th>
                                <th className="px-1 py-2">Amount (Rs)</th>
                                <th className="px-1 py-2">Pay Balance Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchTerm.length > 0 &&
                                <tr className='bg-blue-200'>
                                    <td className='px-1 text-center py-2'>{lastItem?.patient?.casePaperNo}</td>
                                    <td className='px-1 text-center py-2'>{lastItem?.patient?.fullname}</td>
                                    <td className='px-1 text-center py-2'>{lastItem?.patient?.phone}</td>
                                    <td className='px-1 text-center py-2'>{lastItem?.date}</td>
                                    <td className='px-1 text-center py-2'>{lastItem?.appointmentType}</td>
                                    <td className='px-1 text-center font-bold py-2'>{lastItem?.dueBalance && (lastItem?.dueBalance >= 0 ? `Rs ${lastItem?.dueBalance} due` : `Rs ${lastItem?.dueBalance} advance`)}</td>
                                    <td className='px-1 text-center py-2'>{lastItem?.dueBalance > 0 ? <button onClick={() => navigate(`/balance-payment/${lastItem?.patient?._id}`)} className='bg-green-500 text-white py-1 px-3 cursor-pointer w-fit block mx-auto rounded-md'>Pay</button> : '-'}</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default BalanceHistory