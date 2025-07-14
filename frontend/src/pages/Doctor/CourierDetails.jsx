import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Input from '../../components/Input'
import { useStore } from '../../store/UpdateStore'
import { updateDate } from '../../store/todayDate'
import UpdateCourierPayment from '../../components/UpdateCourierPayment'
import { CiCalendar, CiSearch } from 'react-icons/ci'

const CourierDetails = () => {
    const location = useParams();
    const { branchCourierPayment, getCourierPayment } = useStore();
    const [updatePaymentModal, setUpdatePaymentModal] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState(null);
    const todayDate = updateDate();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [showFilter, setShowFilter] = useState(false);

    useEffect(() => {
        getCourierPayment(location.location)
    }, []);

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

    const data = showFilter ? filteredData : branchCourierPayment;

    return (
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
                    <button onClick={handleFilter} className='py-2 cursor-pointer px-4 bg-blue-500 flex items-center gap-5 text-lg font-semibold rounded-lg text-white'>Filter Data <CiSearch size={25} /></button>
                </div>
                <h1 className=' text-blue-500 font-semibold mb-3 text-lg md:text-2xl text-center my-4'>Courier Details</h1>
                <div className="overflow-x-auto mt-10 rounded-lg">
                    <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                        <thead className="bg-[#337ab7]  text-white">
                            <tr >
                                <th className="px-2 py-4 ">Count</th>
                                <th className="px-2 py-4 ">Patient Name</th>
                                <th className="px-4 py-4 ">Patient Case Paper</th>
                                <th className="px-2 py-4 ">Contact Number</th>
                                <th className="px-2 py-4 ">Address</th>
                                <th className="px-2 py-4 ">Order Date</th>
                                <th className="px-2 py-4 ">Balance Amount</th>
                                <th className="px-2 py-4 ">Payment Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((payment, index) => {
                                    return <tr key={index} className='bg-blue-200'>
                                        <td className="px-2 py-4 text-center">{index + 1}</td>
                                        <td className="px-2 py-4 text-center">{payment?.patient?.fullname}</td>
                                        <td className="px-2 py-4 text-center">{payment?.patient?.casePaperNo}</td>
                                        <td className="px-2 py-4 text-center">{payment?.patient?.phone}</td>
                                        <td className="px-2 py-4 text-center">{payment?.patient?.address}</td>
                                        <td className="px-2 py-4 text-center">{payment?.date}</td>
                                        <td className="px-2 py-4 text-center">{payment?.dueBalance}</td>
                                        <td className="px-2 py-4 text-center">
                                            {
                                                payment?.balance_paid_flag === true
                                                    ? <button onClick={() => { setUpdatePaymentModal(true); setPaymentDetails(payment); }} className="bg-green-500 text-white px-3 py-1 rounded-md">View Details</button>
                                                    : 'Payment Not Done'
                                            }
                                        </td>
                                    </tr>
                                }
                                )
                            }
                        </tbody>
                    </table>
                </div>
                {updatePaymentModal && <UpdateCourierPayment payment={paymentDetails} onClose={() => setUpdatePaymentModal(false)} />}
            </div>
        </div>
    )
}

export default CourierDetails