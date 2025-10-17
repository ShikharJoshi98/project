import { useEffect, useState } from 'react'
import { docStore } from '../../store/DocStore'
import { RxCross2 } from 'react-icons/rx';
import { useStore } from '../../store/UpdateStore';
import Input from '../Input';
import { CiCalendar, CiSearch } from 'react-icons/ci';

const ApproveLeaveModal = ({ onClose }) => {
    const { leaves, LeaveDetails, updateLeave } = docStore();
    const { employees, getDetails } = useStore();
    const [employee, setEmployee] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [showFilter, setShowFilter] = useState(false);

    useEffect(() => {
        getDetails();
    }, []);
    useEffect(() => {
        LeaveDetails();
    }, [LeaveDetails])

    const handleFilter = () => {
        if (!employee) {
            alert("Select an Employee");
            return;
        }
        if (!startDate || !endDate) {
            alert('Select Duration');
            return;
        }

        const filtered = leaves?.filter((leave) => {
            if (!leave) return false;

            const start = new Date(startDate);
            const end = new Date(endDate);
            const isHalfDay = leave?.type === 'Half Day';

            const [sDay, sMonth, sYear] = (isHalfDay ? leave?.halfDayDate : leave?.startDate)?.split('-') || [];
            const [eDay, eMonth, eYear] = (isHalfDay ? leave?.halfDayDate : leave?.endDate || leave?.startDate)?.split('-') || [];

            const leaveStart = new Date(`${sYear}-${sMonth}-${sDay}`);
            const leaveEnd = new Date(`${eYear}-${eMonth}-${eDay}`);

            const overlaps =
                leaveStart <= end && leaveEnd >= start;

            return overlaps && leave?.employee?._id === employee;
        });

        setFilteredData(filtered);
        setShowFilter(true);
    };

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
    const data = showFilter ? filteredData : leaves;

    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-h-[90vh] max-w-[99vw] overflow-y-auto   flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
                <button
                    onClick={onClose}
                    className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"
                >
                    <RxCross2 size={24} />
                </button>
                <h1 className="text-blue-500 text-2xl md:text-3xl mb-6 text-center font-semibold">
                    Leave Reports
                </h1>
                <div className='flex flex-col gap-3'>
                    <p>Select Employee:</p>
                    <select value={employee} onChange={(e) => setEmployee(e.target.value)} className='bg-white py-2 pl-2 rounded-md border border-gray-500'>
                        <option value="" disabled >Select Employee</option>
                        {
                            employees?.filter((employee, _) => employee?.role !== 'doctor')?.map((employee, index) => (
                                <option value={employee?._id} key={index}>{employee?.fullname} {`(${employee?.username})`}</option>
                            ))
                        }
                    </select>

                </div>
                <div className='flex flex-wrap md:flex-row flex-col items-center gap-5 md:gap-10 my-10'>
                    <div className='flex sm:flex-row flex-col items-center gap-1'>
                        <p className='whitespace-nowrap'>Start Date :</p>
                        <Input icon={CiCalendar} type='Date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className='flex sm:flex-row flex-col items-center gap-1'>
                        <p className='whitespace-nowrap'>End Date :</p>
                        <Input icon={CiCalendar} type='Date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                    <button onClick={handleFilter} className='py-2 px-4 bg-blue-500 flex items-center gap-5 text-lg font-semibold rounded-lg text-white'>Filter Data <CiSearch /></button>
                </div>
                <div className='mx-auto'>
                    <table className="border-collapse   border-2 border-gray-500 ">
                        <thead>
                            <tr className='bg-blue-500 text-white text-lg'>
                                <th className='px-4 py-2 border border-gray-500'>Serial No.</th>
                                <th className='px-4 py-2 border border-gray-500'>Staff Member</th>
                                <th className='px-4 py-2 border border-gray-500'>Reason</th>
                                <th className='px-4 py-2 border border-gray-500'>Start Date</th>
                                <th className='px-4 py-2 border border-gray-500'>End Date</th>
                                <th className='px-4 py-2 border border-gray-500'>Type</th>
                                <th className='px-4 py-2 border border-gray-500'>Duration</th>
                                <th className='px-4 py-2 border border-gray-500'>Approval Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.map((leave, idx) => (
                                    <tr key={idx} className='hover:bg-blue-300  bg-blue-200 transition-all'>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{idx + 1}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{leave?.employee?.fullname}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{leave?.reason}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{leave?.startDate === "" ? leave?.halfDayDate : leave?.startDate}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{leave?.endDate === "" ? leave?.halfDayDate : leave?.endDate}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{leave?.type}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{getDateDifference(leave?.startDate, leave?.endDate) === 'Invalid Date' ? '-' : getDateDifference(leave?.startDate, leave?.endDate)}</td>
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