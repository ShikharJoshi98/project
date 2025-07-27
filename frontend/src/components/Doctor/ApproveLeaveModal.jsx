import { useEffect } from 'react'
import { docStore } from '../../store/DocStore'
import { RxCross2 } from 'react-icons/rx';

const ApproveLeaveModal = ({ onClose }) => {
    const { leaves, LeaveDetails, updateLeave } = docStore();
    useEffect(() => {
        LeaveDetails();
    }, LeaveDetails)
    function parseDateString(dateStr) {
        const [day, month, year] = dateStr.split('-');
        return new Date(`${year}-${month}-${day}`);
    }
    function getDateDifference(startDate, endDate) {
        const start = parseDateString(startDate);
        const end = parseDateString(endDate);

        if (isNaN(start) || isNaN(end)) {
            return 'Invalid Date';
        }

        const utcStart = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
        const utcEnd = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());

        return (utcEnd - utcStart) / (1000 * 60 * 60 * 24) + 1;
    }
    async function handleClick(id, status) {
        try {
            await updateLeave(id, status);
        } catch (error) {
            console.log(error.message);
        }
    }
    
    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-h-[90vh] max-w-[80vw] overflow-y-auto   flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
                <button
                    onClick={onClose}
                    className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"
                >
                    <RxCross2 size={24} />
                </button>
                <h1 className="text-blue-500 text-2xl md:text-3xl mb-6 text-center font-semibold">
                    Leave Reports
                </h1>
                <div className='mx-auto'>
                    <table className="border-collapse   border-2 border-gray-500 ">
                        <thead>
                            <tr className='bg-blue-500 text-white text-lg'>
                                <th className='px-4 py-2 border border-gray-500'>Serial No.</th>
                                <th className='px-4 py-2 border border-gray-500'>Staff Member</th>
                                <th className='px-4 py-2 border border-gray-500'>Reason</th>
                                <th className='px-4 py-2 border border-gray-500'>Start Date</th>
                                <th className='px-4 py-2 border border-gray-500'>End Date</th>
                                <th className='px-4 py-2 border border-gray-500'>Duration</th>
                                <th className='px-4 py-2 border border-gray-500'>Approval Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                leaves.map((leave, idx) => (
                                    <tr key={idx} className='hover:bg-blue-300  bg-blue-200 transition-all'>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{idx + 1}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{leave?.username}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{leave?.reason}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{leave?.startDate}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{leave?.endDate}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{getDateDifference(leave?.startDate, leave?.endDate)}</td>
                                        {leave?.status === 'PENDING' ?
                                            <td className="border border-gray-300 px-4 py-2 text-center"><div className='flex items-center gap-2'><button onClick={() => handleClick(leave?._id, 'APPROVED')} className='bg-green-500 p-1 text-white rounded-lg cursor-pointer hover:bg-green-700'>Approve</button><button onClick={() => handleClick(leave?._id, 'NOT APPROVED')} className='bg-red-500 p-1 text-white rounded-lg cursor-pointer hover:bg-red-700'>Reject</button></div></td>
                                            :
                                            leave?.status === 'APPROVED' ? <td className='text-green-600 font-semibold border border-gray-300 px-4 py-2 text-center'>{leave?.status}</td> : <td className='text-red-600 font-semibold border border-gray-300 px-4 py-2 text-center'>{leave?.status}</td>
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ApproveLeaveModal