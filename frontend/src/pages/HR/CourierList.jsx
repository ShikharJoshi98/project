import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Input from '../../components/Input';
import UpdateCourierPayment from '../../components/UpdateCourierPayment';
import { HR_API_URL, useStore } from '../../store/UpdateStore';
import { updateDate } from '../../store/todayDate';
import axios from 'axios';
import { CiCalendar, CiSearch } from 'react-icons/ci';

const CourierList = () => {
    const location = useParams();
    const [updatePaymentModal, setUpdatePaymentModal] = useState(false);
    const { branchCourierPayment, getCourierPayment } = useStore();
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const todayDate = updateDate();
    const [submit, setSubmit] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [showFilter, setShowFilter] = useState(false);

    useEffect(() => {
        getCourierPayment(location.location);
    }, [getCourierPayment, submit]);
    const handleFilter = () => {
        if (!startDate || !endDate) return;

        const filtered = branchCourierPayment.filter(payment => {
            if (!payment.date) return false;
            const [day, month, year] = payment?.date.split("-");
            const formattedDateStr = `${year}-${month}-${day}`;
            const orderDate = new Date(formattedDateStr);
            const start = new Date(startDate);
            const end = new Date(endDate);
            return orderDate >= start && orderDate <= end;
        });

        setFilteredData(filtered);
        setShowFilter(true);
    };

    const courierStatus = async (id, patientId) => {
        await axios.patch(`${HR_API_URL}/updateCourierStatus/${id}/${patientId}`);
        setSubmit(prev => !prev);
    }

    const data = showFilter ? filteredData : branchCourierPayment;

    return (
        <>

            <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
                <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
                    <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Courier Medicine List - {location.location}</h1>
                    <h1 className=' text-blue-500 font-semibold mb-3 text-lg md:text-2xl mt-4'>{todayDate}</h1>
                    <hr className='h-[0.5px] px-5 border-none bg-blue-500' />
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
                    <h1 className=' text-blue-500 font-semibold mb-3 text-lg md:text-2xl text-center my-4'>Courier Details</h1>
                    <div className="overflow-x-auto mt-10 rounded-lg">
                        <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                            <thead className="bg-[#337ab7] text-sm text-white">
                                <tr>
                                    <th className="px-1 py-4 ">Patient Name</th>
                                    <th className="px-1 py-4 ">Patient Case Paper</th>
                                    <th className="px-1 py-4 ">Contact Number</th>
                                    <th className="px-1 py-4 ">Address</th>
                                    <th className="px-1 py-4 ">Order Date</th>
                                    <th className="px-1 py-4 ">Balance Amount</th>
                                    <th className="px-1 py-4 ">Receiving Status</th>
                                    <th className="px-2 py-4 ">Courier Order Status</th>
                                    <th className="px-1 py-4 ">Payment Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((payment, index) =>
                                    <tr key={index} className='bg-blue-200'>
                                        <td className='py-4 px-1 text-center'>{payment?.patient?.fullname}</td>
                                        <td className='py-4 px-1 text-center'>{payment?.patient?.casePaperNo}</td>
                                        <td className='py-4 px-1 text-center'>{payment?.patient?.phone}</td>
                                        <td className='py-4 px-1 text-center'>{payment?.patient?.address}</td>
                                        <td className='py-4 px-1 text-center'>{payment?.date}</td>
                                        <td className='py-4 px-1 text-center'>{payment?.dueBalance}</td>
                                        <td className={`py-4 px-1 text-center ${payment?.order_Received_flag === true ? 'text-green-500' : 'text-red-500'} `}>{payment?.order_Received_flag === true ? 'Received' : 'Not Received'}</td>
                                        <td className='py-4 px-1 text-center'>{payment?.order_Received_flag === false ? <button onClick={() => courierStatus(payment?._id, payment?.patient?._id)} className='bg-green-500 py-1 px-2 rounded-md text-white cursor-pointer'>Mark Received</button> : '-'}</td>
                                        <td className='py-4 px-1 text-center'>{payment?.balance_paid_flag === false ? (<button onClick={() => { setUpdatePaymentModal(true); setPaymentDetails(payment); }} className='bg-red-500 py-1 px-2 rounded-md text-white cursor-pointer'>Add Details</button>) : (<button onClick={() => { setUpdatePaymentModal(true); setPaymentDetails(payment); }} className='bg-green-500 py-1 px-2 rounded-md text-white cursor-pointer'>View Details</button>)}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {updatePaymentModal && <UpdateCourierPayment payment={paymentDetails} setSubmit={setSubmit} onClose={() => setUpdatePaymentModal(false)} />}
        </>
    )
}

export default CourierList