import { useAuthStore } from '../../store/authStore';

const PatientAppointment = () => {
    const { user } = useAuthStore();
    
    return (
        <div>
            <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full overflow-hidden'>
                <div className='text-stone-800 w-fit text-sm sm:text-xl flex flex-wrap items-center gap-5 font-semibold m-10 bg-[#dae5f4] p-3 md:p-5 rounded-lg'>
                    <h1>{user?.fullname} </h1>
                    <p className='text-blue-400'>|</p>
                    <div className='flex items-center gap-2'>
                        <h1>Contact No. -</h1>
                        <h1>{user?.phone}</h1>
                    </div>
                    <p className='text-blue-400'>|</p>
                    <div className='flex items-center gap-2'>
                        <h1>Case Paper No. -</h1>
                        <h1>{user?.casePaperNo}</h1>
                    </div>
                </div>
                <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
                    <p className='text-red-500 mb-5 font-semibold'>For Appointments Contact Us at {user?.branch} Branch - 8080899990</p>
                    <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Past Visits</h1>
                    <h1 className='p-1 text-center font-semibold'>( Last Two Visits to the Clinic)</h1>
                    <div className="overflow-x-auto mt-6 rounded-lg">
                        <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                            <thead className="bg-[#337ab7] whitespace-nowrap text-white">
                                <tr >
                                    <th className="px-1 py-2 ">Case Paper No.</th>
                                    <th className="px-1 py-2 ">Date</th>
                                    <th className="px-1 py-2 ">Time</th>
                                    <th className="px-1 py-2 ">Doctor</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                    <h1 className='p-4 mt-20 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Next Visit</h1>
                    <h1 className='p-1 text-center font-semibold'>(Call Us {user?.branch} 8080899990 - Book an Appointment for the Next Vist)</h1>
                    <div className="overflow-x-auto mt-6 rounded-lg">
                        <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                            <thead className="bg-[#337ab7] whitespace-nowrap text-white">
                                <tr >
                                    <th className="px-1 py-2 ">Case Paper No.</th>
                                    <th className="px-1 py-2 ">Date</th>
                                    <th className="px-1 py-2 ">Time</th>
                                    <th className="px-1 py-2 ">Doctor</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientAppointment