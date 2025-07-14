import { useEffect, useState } from 'react'
import Input from '../../components/Input'
import { useAuthStore } from '../../store/authStore'
import axios from 'axios'
import { HR_API_URL } from '../../store/UpdateStore'
import { docStore } from '../../store/DocStore'
import { CiCalendar } from 'react-icons/ci'

const months = { 1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December' };

const ApplyLeaveRec = () => {
    const { user } = useAuthStore();
    const { LeaveDetails, userLeaves } = docStore();
    const [formValues, setFormValues] = useState({
        startDate: "",
        endDate: "",
        reason: "",
        username: user?.username || ""
    });
    const [submit, setSubmit] = useState(false);

    useEffect(() => {
        LeaveDetails(user?.username);
    }, [LeaveDetails, submit])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const approvedLeaves = userLeaves.filter(leave => leave.status === 'APPROVED');

    const leavesByMonth = approvedLeaves.reduce((acc, leave) => {
        const date = leave.startDate.split('-');
        const year = date[date.length - 1];
        const month = months[date[date.length - 2]];
        const duration = leave.duration + 1;
        acc.push({
            month,
            year,
            totalLeaves: duration
        });
        return acc

    }, []);

    const groupedLeaves = Object.values(leavesByMonth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${HR_API_URL}/apply-leave`, formValues);
            setSubmit(prev => !prev);
            setFormValues({
                startDate: "",
                endDate: "",
                reason: "",
                username: user?.username || ""
            })
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
            <div className='bg-[#e9ecef]  w-auto p-5 mx-10 my-6 rounded-lg '>
                <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Apply Leave</h1>
                <div className='flex md:flex-row flex-col md:items-start items-center gap-2 mt-10 w-full'>
                    <form onSubmit={handleSubmit} className='md:w-1/3 w-full space-y-5'>
                        <h1 className='text-lg text-center font-semibold text-blue-600 mb-4'>Apply Leave</h1>
                        <div className='flex flex-col gap-2'>
                            <h1>Start Date :</h1>
                            <Input icon={CiCalendar} name="startDate" value={formValues.startDate} onChange={handleInputChange} type='Date' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h1>End Date :</h1>
                            <Input icon={CiCalendar} name="endDate" value={formValues.endDate} onChange={handleInputChange} type='Date' />
                        </div>
                        <div className='mb-3 '>
                            <h1 className="text-black mb-2 text-lg font-semibold">Reason :</h1>
                            <textarea placeholder='Enter Reason' name="reason" value={formValues.reason} onChange={handleInputChange} className='w-full bg-white h-56  pl-3 pr-3 py-2 font-normal rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900 placeholder-zinc-500 transition duration-200'></textarea>
                        </div>
                        <button type="submit" className="bg-blue-500 w-full transition-all duration-300 cursor-pointer hover:bg-blue-600 py-2 rounded-lg mt-3 text-white">Apply Leave</button>
                    </form>
                    <div className='md:w-2/3 w-full md:mt-10'>
                        <div className='p-2 mx-auto mt-5 overflow-x-auto '>
                            <table className="border-collapse w-full border-2 border-gray-500 ">
                                <thead>
                                    <tr className="bg-blue-500 text-white">
                                        <th className='px-1 py-2'>Year</th>
                                        <th className='px-1 py-2'>Month</th>
                                        <th className='px-1 py-2'>Total Leaves (Days)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        groupedLeaves.map((item, index) => (
                                            <tr key={index} className="bg-blue-100 hover:bg-blue-200 transition">
                                                <td className='text-center py-2'>{item.year}</td>
                                                <td className='text-center py-2'>{item.month}</td>
                                                <td className='text-center py-2'>{item.totalLeaves}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className='p-2 mx-auto mt-5 overflow-x-auto '>
                            <table className="border-collapse w-full border-2  border-gray-500 ">
                                <thead>
                                    <tr className="bg-blue-500 text-white">
                                        <th className='py-2'>SNo.</th>
                                        <th className='px-4 py-2'>Reason</th>
                                        <th className='px-1 py-2'>Start Date</th>
                                        <th className='px-1 py-2'>End Date</th>
                                        <th className='px-1 py-2'>Duration </th>
                                        <th className='px-1 py-2'>Approval Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userLeaves.map((leave, index) => (
                                            <tr key={index} className="hover:bg-blue-300 text-lg font-medium bg-blue-200 transition-all ">
                                                <td className='py-2 text-center'>{index + 1}</td>
                                                <td className='px-1 py-2 text-center'>{leave?.reason}</td>
                                                <td className='px-1 py-2 text-center'>{leave?.startDate}</td>
                                                <td className='px-1 py-2 text-center'>{leave?.endDate}</td>
                                                <td className='px-1 py-2 text-center'>{leave?.duration + 1}</td>
                                                <td className={`px-1 py-2 ${leave?.status === 'PENDING' ? 'text-blue-600' : leave?.status === 'APPROVED' ? 'text-green-600' : 'text-red-600'} text-center`}>{leave?.status}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApplyLeaveRec