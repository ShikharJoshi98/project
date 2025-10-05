import Input from '../../components/Input'
import { docStore } from '../../store/DocStore'
import { useAuthStore } from '../../store/authStore'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { HR_API_URL } from '../../store/UpdateStore'
import { CiCalendar } from 'react-icons/ci'

const months = { 1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December' };

const ApplyLeave = () => {
    const { user } = useAuthStore();
    const { LeaveDetails, userLeaves } = docStore();
    const [formValues, setFormValues] = useState({
        startDate: "",
        endDate: "",
        halfDayDate: "",
        type: "",
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
        let date, year, month, duration;
        if (leave?.type === 'Half Day') {
            date = leave?.halfDayDate?.split('-');
            year = date[date?.length - 1];
            month = months[date[date?.length - 2]];
            duration = "Half Day";
        }
        else {
            date = leave?.startDate.split('-');
            year = date[date.length - 1];
            month = months[date[date.length - 2]];
            duration = leave?.duration + 1;
        }

        acc.push({
            month,
            year,
            totalLeaves: duration
        });
        return acc
    }, []);
    console.log(approvedLeaves);
    const groupedLeaves = Object.values(leavesByMonth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${HR_API_URL}/apply-leave`, formValues);
            setSubmit(prev => !prev);
            setFormValues({
                startDate: "",
                type: "",
                endDate: "",
                reason: "",
                username: user?.username || ""
            })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 p-8  min-h-screen overflow-hidden w-full'>
            <div className='bg-[#e9ecef]  w-auto p-5 rounded-lg '>
                <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-4xl'>Leave Reports</h1>
                <div className='flex md:flex-row flex-col md:items-start items-center mt-10 w-full'>
                    <form onSubmit={handleSubmit} className='md:w-1/3 w-full space-y-5'>
                        <h1 className='text-lg text-center font-semibold text-blue-600 mb-4'>Apply Leave</h1>
                        <div className='flex flex-col gap-2'>
                            <p>Type of Leave :</p>
                            <select value={formValues.type} name='type' onChange={handleInputChange} required className="py-2 pl-2 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900">
                                <option value="" disabled defaultValue>Select type of leave</option>
                                <option value="Full Day/Multiple Days">Full Day/Multiple Days</option>
                                <option value="Half Day">Half Day</option>
                            </select>
                        </div>
                        {formValues.type === "Full Day/Multiple Days" &&
                            <>
                                <div className='flex flex-col gap-2'>
                                    <p>Start Date :</p>
                                    <Input icon={CiCalendar} required name="startDate" value={formValues.startDate} onChange={handleInputChange} type='Date' />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <p>End Date :</p>
                                    <Input icon={CiCalendar} required name="endDate" value={formValues.endDate} onChange={handleInputChange} type='Date' />
                                </div>
                            </>}
                        {
                            formValues.type === "Half Day" &&
                            <div className='flex flex-col gap-2'>
                                <p>Date :</p>
                                <Input icon={CiCalendar} required name="halfDayDate" value={formValues.halfDayDate} onChange={handleInputChange} type='Date' />
                            </div>
                        }
                        <div className='mb-3 '>
                            <h1 className="text-black mb-2 font-semibold">Reason :</h1>
                            <textarea placeholder='Enter Reason' required name="reason" value={formValues.reason} onChange={handleInputChange} className='w-full bg-white h-56  pl-3 pr-3 py-2 font-normal  rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900 placeholder-zinc-500 transition duration-200'></textarea>
                        </div>
                        <button type="submit" className="bg-blue-500 w-full transition-all duration-300 cursor-pointer hover:bg-blue-600 py-2 rounded-lg mt-3 text-white">Apply Leave</button>
                    </form>
                    <div className='md:w-2/3 w-full md:mt-10'>
                        <div className='p-2 mx-auto mt-5 overflow-x-auto '>
                            <table className="border-collapse w-full border-2 border-gray-500 ">
                                <thead>
                                    <tr className="bg-blue-600 text-white">
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
                            <table className="border-collapse w-full border-2 border-gray-500 ">
                                <thead>
                                    <tr className="bg-blue-600 text-white">
                                        <th className='px-2 py-2'>Serial No.</th>
                                        <th className='px-2 py-2'>Reason</th>
                                        <th className='px-2 py-2'>Start Date</th>
                                        <th className='px-2 py-2'>End Date</th>
                                        <th className='px-2 py-2'>Type</th>
                                        <th className='px-2 py-2'>Duration </th>
                                        <th className='px-2 py-2'>Approval Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userLeaves.map((leave, index) => (
                                            <tr key={index} className="hover:bg-blue-300 font-medium bg-blue-200 transition-all ">
                                                <td className='py-2 text-center'>{index + 1}</td>
                                                <td className='px-1 py-2 text-center'>{leave?.reason}</td>
                                                <td className='px-1 py-2 text-center'>{leave?.startDate === "" ? leave?.halfDayDate : leave?.startDate}</td>
                                                <td className='px-1 py-2 text-center'>{leave?.endDate === "" ? leave?.halfDayDate : leave?.endDate}</td>
                                                <td className='px-1 py-2 text-center'>{leave?.type}</td>
                                                <td className='px-1 py-2 text-center'>{leave?.duration ? (leave?.duration + 1) : '-'}</td>
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

export default ApplyLeave